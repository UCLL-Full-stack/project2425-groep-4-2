import { Review, } from '@/types';
import React, { useEffect, useState } from 'react';
import ReviewService from '@/services/ReviewService';

type Props = {
  reviews: Array<Review>;
  onDeleteReview: (review: Review) => void;
};

const ReviewOverview: React.FC<Props> = ({ reviews, onDeleteReview }: Props) => {
  const [loggedInUserRole, setLoggedInUserRole] = useState<string>('');
  
    useEffect(() => {
      const userString = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      if(userString){
        setLoggedInUserRole(userString.role)
      }
    }, []);

  return (
    <>
      {reviews && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Rating -/5</th>
              <th scope="col">Description</th>
              <th scope="col">Reviewer id</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <tr key={index}>
                  <td>{review.id}</td>
                  <td>{review.game?.name}</td>
                  <td>{review.stars}</td>
                  <td>{review.description}</td>
                  <td>{review.reviewerId}</td>
                  {loggedInUserRole !== 'normal' &&  <td>
                      <button  onClick={() => onDeleteReview(review)}>
                      <p>Delete</p>
                      </button>
                    </td>}
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>There are currently no reviews</td>
            </tr>
          )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ReviewOverview;