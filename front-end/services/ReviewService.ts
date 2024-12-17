import { Review } from "@/types";

const getAllReviews = async () => {
  const token = JSON.parse(localStorage.getItem('loggedInUser') || '{}')?.token;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + '/reviews', {
    method: 'GET',
    headers:{
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
};

const addReview = async (review: Review) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/reviews', {
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(review)
    })
}

const deleteReview = async (reviewId: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  return fetch(`${apiUrl}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json',
      }
  });
};

const ReviewService = {
  getAllReviews,
  addReview,
  deleteReview,
};

export default ReviewService;