import { Review } from '@/types';
import React from 'react';
// import AddReview from './AddReview';
import ReviewService from '@/services/ReviewService';

type Props = {
  reviews: Array<Review>;
  onDeleteReview: (review: Review) => void;
};

const ReviewOverview: React.FC<Props> = ({ reviews, onDeleteReview }: Props) => {
  return (
    <>
      {reviews && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Price</th>
              <th scope="col">Name</th>
              <th scope="col">Version</th>
              <th scope="col">Brand</th>
              <th scope="col">Release date</th>
            </tr>
          </thead>
          <tbody>
            {
              reviews.map((review, index) => (
                <tr key={index}>
                  <td>{review.id}</td>
                  <td>{review.stars}</td>
                  <td>{review.description}</td>
                  <td>{review.game.name}</td>
                  <td>{review.reviewerId}</td>
                  <td
                      onClick={() => onDeleteReview(review)}
                    >
                      <p>Delete</p>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ReviewOverview;