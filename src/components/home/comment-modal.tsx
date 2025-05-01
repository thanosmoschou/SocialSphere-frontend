import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "../../store/user-context";
import { useComment } from "../../features/use-comment";

interface CommentModalProps {
    open: boolean;
    onClose: () => void;
    postId: number;
}

export const CommentModal = ({ open, onClose, postId }: CommentModalProps) => {
    const [commentContent, setCommentContent] = useState("");
    const { user } = useUserContext();
    const { comment, isCommentPending } = useComment(postId, user?.userId || 0);

    const handleComment = async () => {
        if (!user?.userId || !commentContent.trim()) {
            return;
        }
        await comment(commentContent);
        handleClose();
    };

    const handleClose = () => {
        setCommentContent("");
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                className: "bg-black border border-gray-800 rounded-2xl"
            }}
        >
            <DialogContent className="p-0 bg-black">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                        <h2 className="text-xl font-semibold text-white">Add Comment</h2>
                        <button 
                            onClick={handleClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <textarea
                                className="w-full h-32 p-3 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Write your comment..."
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-6 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleComment}
                                disabled={!commentContent.trim() || isCommentPending}
                            >
                                {isCommentPending ? "Commenting..." : "Comment"}
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}; 