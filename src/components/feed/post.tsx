import ProfilePicture from "../../assets/profile-gradient-border.png";
import PostImage1 from "../../assets/post-image-1.png";
import PostImage2 from "../../assets/post-image-2.png";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

export const Post = () => {
    return (
        <section className={`flex flex-col justify-between gap-y-10 bg-white rounded-2xl p-5`}>
            <section className='flex justify-between items-center'>
                <section className='flex items-center gap-x-5'>
                    <img 
                        src={ProfilePicture} 
                        alt="Profile Picture" 
                        className="w-12 h-12 rounded-full"
                    />
                    <section>
                        <h1 className="text-black text-xl font-medium">Dimitris Sparagis</h1>
                        <h3 className="text-gray-500 text-sm font-medium">@dimsparagis</h3>
                    </section>
                </section>
                <p>12:00</p>
            </section>
            <section className="flex flex-col gap-y-5">
                {/* Generate a random number of paragraphs */}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                <section className="flex gap-x-5">
                    <img 
                        src={PostImage1} 
                        alt="Post Image 1" 
                        className="w-40 h-40 rounded-2xl"
                    />
                    <img 
                        src={PostImage2} 
                        alt="Post Image 2" 
                        className="w-40 h-40 rounded-2xl"
                    />
                </section>
                <section className="flex items-center gap-x-5">
                    <section className="flex items-center gap-x-2 text-red-500">
                        <FavoriteIcon />
                        <p>Like</p>
                    </section>
                    <section className="flex items-center gap-x-2 text-gray-500">
                        <CommentIcon />
                        <p>Comment</p>
                    </section>
                </section>
            </section>
        </section>
    )
}