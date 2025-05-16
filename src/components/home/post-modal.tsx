import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "../../store/user-context";
import { createPost } from "../../api/post";
import { useQueryClient } from "@tanstack/react-query";

interface PostModalProps {
    open: boolean;
    onClose: () => void;
}

export const PostModal = ({ open, onClose }: PostModalProps) => {
    const [postContent, setPostContent] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { user, refetchUser } = useUserContext();
    const queryClient = useQueryClient();
    
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = async () => {
        if (!user?.userId) {
            console.error("User ID is not available");
            return;
        }
        await createPost({
            content: postContent,
            photo: selectedImage,
            creatorId: user.userId || null,
        });
        // Invalidate posts query to trigger a refetch
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
        // Update the user context
        await refetchUser();
        // Clear all fields
        handleClose();
    };

    const handleClose = () => {
        setPostContent("");
        setSelectedImage(null);
        setImagePreview(null);
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                className: "bg-black border border-gray-800 rounded-2xl"
            }}
        >
            <DialogContent className="p-0 bg-black">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                        <h2 className="text-xl font-semibold text-white">Create Post</h2>
                        <button 
                            onClick={handleClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-1">
                                <label className="text-gray-400 text-sm">Content</label>
                                <span className="text-red-500">*</span>
                            </div>
                            <input
                                type="text"
                                className={`w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                    !postContent && postContent !== "" ? "ring-2 ring-red-500" : ""
                                }`}
                                placeholder="What's on your mind?"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                            {!postContent && postContent !== "" && (
                                <p className="text-red-500 text-sm">Content is required</p>
                            )}
                        </div>
                        {imagePreview && (
                            <div className="relative">
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => {
                                        setSelectedImage(null);
                                        setImagePreview(null);
                                    }}
                                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                                >
                                    <CloseIcon className="text-white" />
                                </button>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                            <label className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageSelect}
                                />
                                <ImageIcon />
                                <span>Add Image</span>
                            </label>
                            
                            <div className="flex gap-3">
                                <button
                                    className="px-6 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-6 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handlePost}
                                    disabled={!postContent}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};