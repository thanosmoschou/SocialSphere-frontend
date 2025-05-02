export type User = {
   userId:number;
   email:string;
   createdAt:string;
   bio:string;
   location:string;
   profileName:string;
   displayName:string;
   posts:Post[];
   role:string;
   followers:[];
   following:[];
   skills: string[];
   interests: string[];
   userLinks: UserLink[];
}

export type UserLink = {
   name: string;
   url: string;
}

export type Post = {
   title: string;
   description: string | null;
   imageUrl: string | null;
   creatorId: number | null;
   date: string;
   postId: number;
   usersLiked: number[];
   hashtags: string[];
   comments: Comment[];
};

export type Comment = {
   commentId: number;
   content: string;
   userCommented: number;
   date: string;
};

export type Hashtag = {
   hashtagId: number;
   name: string;
};

export type CommentDTO = {
   content: string;
   postId: number;
   userId: number;
};


export type UserProfile = {
   name: string;
   username: string;
   bio: string;
   location: string;
   joinedDate: string;
   stats: {
       posts: number;
       followers: number;
       following: number;
   };
   isOwnProfile: boolean;
}


