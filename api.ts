
// import { INewPost, INewUser } from "@/types";
// // import { ID } from 'appwrite';
// import { account, appwriteConfig, avatars, databases, storage } from "./config";
// // import { Query} from "@tanstack/react-query";
// import { ID, Query } from "appwrite";
// // import { query } from "@tanstack/react-query";
// export async function createUserAccount(user: INewUser) {
//     try {
//         const newAccount = await account.create(
//             ID.unique(),
//             user.email,
//             user.password,
//             user.name
//         )

//         if (!newAccount) throw Error;

//         const avatarUrl = avatars.getInitials(user.name);

//         const newUser = await saveUserToDB({
//             accountId: newAccount.$id,
//             name: newAccount.name,
//             email: newAccount.email,
//             username: user.username,
//             imageUrl: avatarUrl,
//         })

//         return newUser;

//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// export async function saveUserToDB(user: {
//     accountId: string;
//     email: string;
//     name: string;
//     imageUrl: URL;
//     username?: string;

// }) {
//     try {
//         const newUser = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             ID.unique(),
//             user,
//         );

//         return newUser;
//     } catch (error) {
//         console.log(error);
//     }

// }

// export async function signInAccount(user: { email: string; password: string; }) {
//     try {
//         const session = await account.createEmailSession(user.email, user.password);
//         localStorage.setItem("sessionId", session.userId);
//         return session;
//     } catch (error) {
//         console.log(error);

//     }



// }



// // export async function getCurrentUser() {
// //     try {
// //         // const currentAccount = await account.get();
// //         const currentAccountId = localStorage.getItem("sessionId");

// //         // if(!currentAccount) throw Error;
// //         if (currentAccountId !== null) {

// //             const currentUser = await databases.listDocuments(
// //                 appwriteConfig.databaseId,
// //                 appwriteConfig.userCollectionId,
// //                 [Query.equal('accountId', currentAccount.$id)]
// //             )

// //             // const currentUser = await databases.listDocuments(

// //             //     // query([["accountId", "eq", currentAccount.$id]]) 
// //             // )

// //             if (!currentUser) throw Error;

// //             return currentUser.documents[0];

// //         } catch (error) {
// //             console.log(error);
// //         }


// export async function getCurrentUser() {
//     try {
//         // console.log("userId: ", localStorage.getItem("sessionId"));
//         // const currentAccount = await account.get();
//         const currentAccountId = localStorage.getItem("sessionId");

//         if (currentAccountId !== null) {
//             // if (!currentAccount) throw Error;

//             const currentUser = await databases.listDocuments(
//                 appwriteConfig.databaseId,
//                 appwriteConfig.userCollectionId,
//                 // [Query.equal("accountId", currentAccount.$id)]
//                 [Query.equal("accountId", currentAccountId)]
//             );

//             // console.log("currentUser:", currentUser);

//             if (!currentUser) throw Error;

//             return currentUser.documents[0];
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }




// export async function signOutAccount() {
//     try {
//         const session = await account.deleteSession("current");
//         return session;

//     } catch (error) {
//         console.log(error);
//     }
// }

// // export async function createPost(post: INewPost) {
// //     try {
// //         //Upload image to storage
// //         const uploadedFile = await uploadFile(post.file[0]);

// //         if (!uploadedFile) throw Error;

// //         // Get File Url
// //         const fileUrl = getFilePreview(uploadedFile.$id);
// //         if (!fileUrl) {
// //             deleteFile(uploadedFile.$id);
// //             throw Error;

// //         }

// //         //Convert tags to array
// //         const tags = post.tags?.replace(/ /g, ' ').split(',') || [];

// //         // Save post to database
// //         const newPost = await databases.createDocument(
// //             appwriteConfig.databaseId,
// //             appwriteConfig.postCollectionId,
// //             ID.unique(),
// //             {
// //                 creator: post.userId,
// //                 caption: post.caption,
// //                 imageUrl: fileUrl,
// //                 imageId: uploadedFile.$id,
// //                 location: post.location,
// //                 tags: tags,
// //             }
// //         )

// //         if (!newPost) {
// //             await deleteFile(uploadedFile.$id)
// //             throw Error;
// //         }

// //         return newPost;
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }


// export async function createPost(post: INewPost) {
//     try {
//         // Upload image to storage
//         const uploadedFile = await uploadFile(post.file[0]);

//         if (!uploadedFile) throw Error;

//         // Get File Url
//         const fileUrl = getFilePreview(uploadedFile.$id);
//         if (!fileUrl) {
//             deleteFile(uploadedFile.$id);
//             throw Error;
//         }

//         // Convert tags to array
//         const tags = post.tags?.replace(/ /g, ' ').split(',') || [];

//         // Save post to database, include imageId
//         const newPost = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             ID.unique(),
//             {
//                 creator: post.userId,
//                 caption: post.caption,
//                 imageUrl: fileUrl,
//                 imageId: uploadedFile.$id, // Include the file ID here
//                 location: post.location,
//                 tags: tags,
//             }
//         );

//         if (!newPost) {
//             await deleteFile(uploadedFile.$id);
//             throw Error;
//         }

//         return newPost;
//     } catch (error) {
//         console.log(error);
//     }
// }


// export async function getFilePreview(fileId: string) {
//     try {
//         const fileUrl = storage.getFilePreview(
//             appwriteConfig.storageId,
//             fileId,
//             2000,
//             2000,
//             "top",
//             100,
//         )
//         return fileUrl;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function uploadFile(file: File) {
//     try {
//         const uploadedFile = await storage.createFile(
//             appwriteConfig.storageId,
//             ID.unique(),
//             file
//         );

//         return uploadedFile;
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function deleteFile(fileId: string) {
//     try {
//         await storage.deleteFile(appwriteConfig.storageId, fileId);
//         return { status: 'ok' }
//     } catch (error) {
//         console.log(error);
//     }
// }

// export async function getRecentPosts() {
//     const posts = await databases.listDocuments(
//         appwriteConfig.databaseId,
//         appwriteConfig.postCollectionId,
//         [Query.orderDesc('$createdAt'), Query.limit(20)]
//     )

//     if (!posts) throw Error;

//     return posts;

// }


// Import necessary modules and types
import { INewPost, INewUser, IUpdatePost } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

// Function to create a new user account
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Function to save a new user to the database
export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Function to sign in to an account
export async function signInAccount(user: { email: string; password: string }) {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        localStorage.setItem("sessionId", session.userId);
        return session;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Function to get the current user
export async function getCurrentUser() {
    try {
        const currentAccountId = localStorage.getItem("sessionId");

        if (currentAccountId !== null) {
            const currentUser = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                [Query.equal("accountId", currentAccountId)]
            );

            if (!currentUser) throw Error;

            return currentUser.documents[0];
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Function to sign out from the account
export async function signOutAccount() {
    try {
        localStorage.clear();
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Function to create a new post
export async function createPost(post: INewPost) {
    try {
        // Upload image to storage
        const uploadedFile = await uploadFile(post.file[0]);

        if (!uploadedFile) throw Error;

        // Get File Url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
            deleteFile(uploadedFile.$id);
            throw Error;
        }

        // Convert tags to array
        const tags = post.tags?.replace(/ /g, ' ').split(',') || [];

        // Save post to database, include imageId
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id, // Include the file ID here
                location: post.location,
                tags: tags,
            }
        );

        if (!newPost) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        return newPost;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Function to get a file preview URL
export async function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
        );
        return fileUrl;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Function to upload a file to storage
export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Function to delete a file from storage
export async function deleteFile(fileId: string) {
    try {        await storage.deleteFile(appwriteConfig.storageId, fileId);
        return { status: 'ok' };
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Function to get recent posts
export async function getRecentPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(20)]
        );

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// // Function to like a post
// export async function likePost(postId: string, likeArray: string[]) {
//     try {
//         const updatedPost = await databases.updateDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             postId,
//             {
//                 likes: likeArray,
//             }
//         );

//         if (!updatedPost) throw Error;

//         return updatedPost;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// Function to save a post
export async function savePost(postId: string, userId: string) {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        );

        if (!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// // Function to delete a saved post
// export async function deleteSavedPost(savedRecordId: string) {
//     try {
//         const statusCode = await databases.deleteDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.savesCollectionId,
//             savedRecordId
//         );

//         if (!statusCode) throw Error;

//         return { status: 'ok' };
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to get a post by its ID
// export async function getPostById(postId: string) {
//     try {
//         const post = await databases.getDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             postId
//         );

//         return post;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to update a post
// export async function updatePost(post: IUpdatePost) {
//     const hasFileToUpdate = post.file.length > 0;

//     try {
//         let image = {
//             imageUrl: post.imageUrl,
//             imageId: post.imageId,
//         };

//         if (hasFileToUpdate) {
//             // Upload image to storage
//             const uploadedFile = await uploadFile(post.file[0]);

//             if (!uploadedFile) throw Error;

//             const fileUrl = getFilePreview(uploadedFile.$id);

//             if (!fileUrl) {
//                 deleteFile(uploadedFile.$id);
//                 throw Error;
//             }

//             image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
//         }

//         // Convert tags to an array
//         const tags = post.tags?.replace(/ /g, '').split(',') || [];

//         let updatedPost;

//         if (!hasFileToUpdate) {
//             // Update post to the database if it's a video
//             updatedPost = await databases.updateDocument(
//                 appwriteConfig.databaseId,
//                 appwriteConfig.postCollectionId,
//                 post.postId,
//                 {
//                     caption: post.caption,
//                     imageUrl: image.imageUrl,
//                     imageId: image.imageId,
//                     location: post.location,
//                     tags: tags,
//                 }
//             );
//         } else {
//             // Update post to the database if it's not a video
//             updatedPost = await databases.updateDocument(
//                 appwriteConfig.databaseId,
//                 appwriteConfig.postCollectionId,
//                 post.postId,
//                 {
//                     caption: post.caption,
//                     imageUrl: image.imageUrl,
//                     imageId: image.imageId,
//                     location: post.location,
//                     tags: tags,
//                     isVideo: post.file[0].type.startsWith('video') ? true : false,
//                 }
//             );
//         }

//         if (!updatedPost) {
//             await deleteFile(post.imageId);
//             throw Error;
//         }

//         return updatedPost;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to delete a post
// export async function deletePost(postId?: string, imageId?: string) {
//     if (!postId || !imageId) throw Error;

//     try {
//         const statusCode = await databases.deleteDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             postId
//         );

//         if (!statusCode) throw Error;

//         await deleteFile(imageId);

//         return { status: 'ok' };
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to get infinite posts
// export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
//     const queries: unknown[] = [Query.orderDesc('$updatedAt'), Query.limit(10)];

//     if (pageParam) {
//         queries.push(Query.cursorAfter(pageParam.toString()));
//     }

//     try {
//         const posts = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             queries
//         );

//         if (!posts) throw Error;

//         return posts;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to search posts
// export async function searchPosts(searchTerm: string) {
//     try {
//         const posts = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             [Query.search('caption', searchTerm)]
//         );

//         if (!posts) throw Error;

//         return posts;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

//         // Function to get user posts
// export async function getUserPosts(userId?: string) {
//     if (!userId) return;

//     try {
//         const userPosts = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
//         );

//         if (!userPosts) throw Error;

//         return userPosts;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to get saved posts for a user
// export async function getSavedPosts(userId?: string) {
//     if (!userId) return;

//     try {
//         const savedPosts = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.savesCollectionId,
//             [Query.equal('user', userId), Query.orderDesc('$createdAt')]
//         );

//         if (!savedPosts) throw Error;

//         const postIds = savedPosts.documents.map((savedPost) => savedPost.post);
//         const posts = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.postCollectionId,
//             [Query.in('_id', postIds)]
//         );

//         if (!posts) throw Error;

//         return posts;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to follow a user
// export async function followUser(userIdToFollow: string, followerId: string) {
//     try {
//         const followRecord = await databases.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.followsCollectionId,
//             ID.unique(),
//             {
//                 userIdToFollow,
//                 followerId,
//             }
//         );

//         if (!followRecord) throw Error;

//         return followRecord;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to unfollow a user
// export async function unfollowUser(followRecordId: string) {
//     try {
//         const statusCode = await databases.deleteDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.followsCollectionId,
//             followRecordId
//         );

//         if (!statusCode) throw Error;

//         return { status: 'ok' };
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to get followers for a user
// export async function getFollowers(userId: string) {
//     try {
//         const followers = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.followsCollectionId,
//             [Query.equal('userIdToFollow', userId)]
//         );

//         if (!followers) throw Error;

//         const followerIds = followers.documents.map((follower) => follower.followerId);
//         const followerDetails = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.in('_id', followerIds)]
//         );

//         if (!followerDetails) throw Error;

//         return followerDetails;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to get following for a user
// export async function getFollowing(userId: string) {
//     try {
//         const following = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.followsCollectionId,
//             [Query.equal('followerId', userId)]
//         );

//         if (!following) throw Error;

//         const followingIds = following.documents.map((followedUser) => followedUser.userIdToFollow);
//         const followingDetails = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.in('_id', followingIds)]
//         );

//         if (!followingDetails) throw Error;

//         return followingDetails;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// // Function to get suggested users to follow
// export async function getSuggestedUsers(userId: string) {
//     try {
//         // Get the users that the current user is already following
//         const following = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.followsCollectionId,
//             [Query.equal('followerId', userId)]
//         );

//         if (!following) throw Error;

//         const followingIds = following.documents.map((followedUser) => followedUser.userIdToFollow);

//         // Get users who are not the current user and not already followed
//         const suggestedUsers = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [
//                 Query.notIn('_id', [...followingIds, userId]),
//                 Query.limit(5),
//                 Query.orderBy('name'),
//             ]
//         );

//         if (!suggestedUsers) throw Error;

//         return suggestedUsers;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }
