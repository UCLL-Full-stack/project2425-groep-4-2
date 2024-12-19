import AddReview from "@/components/reviews/AddReview";
import ReviewOverview from "@/components/reviews/ReviewOverview";
import Header from "@/components/header";
import ReviewService from "@/services/ReviewService";
import { Review, ReviewData, } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Array <Review>>([]) ;
    const [statusError, setStatusError] = useState<string>();

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

    const [loggedInUserBlacklisted, setLoggedInUserBlacklisted] = useState<boolean>(false);
  
    useEffect(() => {
      const userString = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      if(userString){
        setLoggedInUserBlacklisted(userString.blacklisted)
      }
    }, []);

    const getReviews = async () => {
        const response = await ReviewService.getAllReviews();
        const json = await response.json();
        if(!response.ok){
          if(response.status === 401){
            setStatusError("You are not authorized for this page. Please login first.");
          }
          else{
            setStatusError(response.statusText);
          }
      }
        //const allReviews = extractAllReviews(json);
        setReviews(json);
    };

    const handleDeleteReview = async (review: Review) => {
        if(confirm("Are you sure to delete " + review.game?.name)) {
            if (review.id) {
                await ReviewService.deleteReview(review);
                getReviews();
            }
          }
    }

    const { data, isLoading, error } = useSWR(
      "reviews",
      getReviews,
  );

  useInterval(() => {
    mutate("reviews", getReviews());
}, 1000);

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
                {statusError && <div className="text-red-800">{statusError}</div>}
                {statusError && <div className="text-red-800">{statusError}</div>}
                    {
                    !loggedInUserBlacklisted && !error && reviews && <ReviewOverview reviews={reviews} onDeleteReview={handleDeleteReview} />
                    }
                    {loggedInUserBlacklisted && <div className="text-red-800">You have been blacklisted. Please contact the admin.</div>}
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any; }) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

export default Reviews;