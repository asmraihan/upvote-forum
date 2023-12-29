type UserAvatarTye = {
  name: string;
  image?: string;
};

type AuthStateType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
};

type AuthErrorType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
   password_confirmation?: string;
};

type PostErrorType = {
  content?: string;
  image?: string;
};

// * Post type
type User = {
  id: string;
  name: string;
  username: string;
  email?: string;
  image?: string;
};

type PostType = {
  id: string;
  user_id: string;
  content: string;
  image?: string;
  comment_count: number;
  like_count: number;
  created_at: string;
  user: User;
  Likes: Array<PostLikeType> | [];
};

type CommentType = {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  user: User;
};

type NotificationType = {
  id: string;
  user_id: string;
  toUser_id: string;
  content: string;
  created_at: string;
  user: User;
};

type ShowUserType = {
  name: string;
  id: string;
  email: string;
  username: string;
  image: string;
  Post: Array<PostType> | [];
  Comment: Array<CommentType> | [];
};

type LikeType = {
  post_id: string;
  toUserId: string;
  status: string;
};

type PostLikeType = {
  id: string;
  post_id: string;
  user_id: string;
};
