import AddReview from "@/components/reviews/AddReview";
import ReviewOverview from "@/components/reviews/ReviewOverview";
import Header from "@/components/header";
import ReviewService from "@/services/ReviewService";
import { Review, ReviewData, } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Array <Review>>([]) ;
    const [isFormOpen, setIsFormOpen] = useState(false);

    const extractAllReviews = (data: ReviewData[]): Review[] => {
      const allReviews: Review[] = [];
      data.forEach((user: ReviewData) => {
        user.reviews.forEach((review: Review) => {
          allReviews.push(review);
        });
      });
      return allReviews;
    };
    

    const getReviews = async () => {
        const response = await ReviewService.getAllReviews();
        const json = await response.json();
        const allReviews = extractAllReviews(json);
        setReviews(allReviews);
    };

    const handleAddReview = async () => {
        getReviews();
        setIsFormOpen(false);
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
                <button
                    className="mt-6 rounded-lg relative w-36 h-10 cursor-pointer flex items-center border border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500"
                    onClick={() => setIsFormOpen(true)}
                >
                    <span
            className="text-black font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
          >Add Review</span>
        </button>
                <h2>Reviews overview</h2>
                <section>
                    {
                    reviews && <ReviewOverview reviews={reviews} onDeleteReview={handleDeleteReview} />
                    }
                </section>
                {isFormOpen && (
          <AddReview
            toggleForm={() => setIsFormOpen(false)}
            onAddReview={handleAddReview}
          />
        )}
            </main>
        </>
    );
};

export default Reviews;