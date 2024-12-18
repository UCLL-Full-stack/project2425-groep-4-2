import AddReview from "@/components/reviews/AddReview";
import ReviewOverview from "@/components/reviews/ReviewOverview";
import Header from "@/components/header";
import ReviewService from "@/services/ReviewService";
import { Review, ReviewData, } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Array <Review>>([]) ;
    const [error, setError] = useState<string>();

    /*
    const extractAllReviews = (data: ReviewData[]): Review[] => {
      const allReviews: Review[] = [];
      data.forEach((user: ReviewData) => {
        user.reviews.forEach((review: Review) => {
          allReviews.push(review);
        });
      });
      return allReviews;
    };
    */
    

    const getReviews = async () => {
        const response = await ReviewService.getAllReviews();
        const json = await response.json();
        if(!response.ok){
          if(response.status === 401){
              setError("You are not authorized for this page. Please login first.");
          }
          else{
              setError(response.statusText);
          }
      }
        //const allReviews = extractAllReviews(json);
        setReviews(json);
    };

    const handleDeleteReview = async (review: Review) => {
        if (review.id) {
            await ReviewService.deleteReview(review.id);
            getReviews();
        }
    }

    useEffect(() => {
        getReviews();
    }, []);

    return (
        <>
            <Head>
                <title>Reviews</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Reviews</h1>
                <h2>Reviews overview</h2>
                <section>
                {error && <div className="text-red-800">{error}</div>}
                    {
                    !error && reviews && <ReviewOverview reviews={reviews} onDeleteReview={handleDeleteReview} />
                    }
                </section>
            </main>
        </>
    );
};

export default Reviews;