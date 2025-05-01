import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "../../store/user-context";
import { createPost } from "../../api/post";

interface PostModalProps {
    open: boolean;
    onClose: () => void;
}

export const PostModal = ({ open, onClose }: PostModalProps) => {
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { user, setUser, refetchUser } = useUserContext();
    
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
        // TODO: Implement post functionality with title, content, and image
        if (!user?.userId) {
            console.error("User ID is not available");
            return;
        }
        await createPost({
            title: postTitle,
            description: postContent,
            imageUrl: "",
            creatorId: user.userId || null,
        });
        // Update the user context
        await refetchUser();
        // Clear all fields
        handleClose();
    };

    const handleClose = () => {
        setPostTitle("");
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
                                <label className="text-gray-400 text-sm">Title</label>
                                <span className="text-red-500">*</span>
                            </div>
                            <input
                                type="text"
                                className={`w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                    !postTitle && postTitle !== "" ? "ring-2 ring-red-500" : ""
                                }`}
                                placeholder="Give your post a title"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                            {!postTitle && postTitle !== "" && (
                                <p className="text-red-500 text-sm">Title is required</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-gray-400 text-sm">Content (optional)</label>
                            <textarea
                                className="w-full h-40 p-3 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="What's on your mind?"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
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
                                    disabled={!postTitle}
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