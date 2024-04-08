"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Input from "./Input";
const UploadModal = () => {
    const [isLoading, setIsLoading] = useState();
    const router = useRouter();
    const uploadModal = useUploadModal();
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
        // upload to supabase function
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
                </form>
        </Modal>
     );
}
 
export default UploadModal;