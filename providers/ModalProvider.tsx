"use client";

import { useEffect, useState } from "react";
 
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null; 
    return ( 
        <div>
            <AuthModal />
            <UploadModal />
        </div>
     );
}
 
export default ModelProvider;