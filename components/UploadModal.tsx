"use client";

import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/hooks/useUser";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

import Modal from "./Modal";
import Input from "./Input";
import toast from "react-hot-toast";
import Button from "./Button";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {user} = useUser();
    const uploadModal = useUploadModal();
    const supabaseClient = useSupabaseClient();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null, 
            image: null
        },
    
    });
    const onChange = (open: boolean) => {
        if(!open){
            reset();
            uploadModal.onClose();
        }
    }
    
    const onSubmit: SubmitHandler<FieldValues> =async (values) => {
        try{
            setIsLoading(true);
            
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if(!imageFile || !songFile || !user){
                toast.error("Please fill all fields");
                return;
            }

            //define id to store in suparbase
            const uniqueID = uniqid();

            //upload song
            const {
                data: songData,
                error: songError
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if(songError){
                setIsLoading(false);
                return toast.error("Failed to upload song");
            }

            //upload image

            const {
                data: imageData,
                error: imageError
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });
            
            if(imageError){
                setIsLoading(false);
                return toast.error("Failed to upload image");
            }

            const { 
                error: supabaseError
             } = await supabaseClient
                .from('songs')
                .insert({
                    title: values.title,
                    user_id: user.id,
                    author: values.author,  
                    image_path: imageData.path,
                    song_path: songData.path
                });

            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song created successfully");
            reset();
            uploadModal.onClose();


        } catch (error){
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);

        }
    }

    return ( 
        <Modal
            title = "Add a song"
            description="Upload a mp3 file"
            isOpen = {uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
                >
                    <Input 
                        id = "title"
                        disabled={isLoading}
                        {...register('title', {required: true})}
                        placeholder="Song Title"
                    />
                    <Input 
                        id = "author"
                        disabled={isLoading}
                        {...register('author', {required: true})}
                        placeholder="Song Author"
                    />
                    <div>
                        <div className="pb-1">
                            Select a song file
                        </div>
                        <Input 
                                id = "song"
                                type = 'file'
                                disabled={isLoading}
                                accept=".mp3"
                                {...register('song', {required: true})}
                        />
                    </div>
                    <div>
                        <div className="pb-1">
                            Select a image file
                        </div>
                        <Input 
                            id ="image"
                            type = 'file'
                            disabled={isLoading}
                            accept="image/*"
                            {...register('image', {required: true})}
                            />
                    </div>
                    <Button disabled = {isLoading} type = 'submit'>
                        Create
                    </Button>
                        
                </form>
        </Modal>
     );
}
 
export default UploadModal;