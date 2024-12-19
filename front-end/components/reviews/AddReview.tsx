import ReviewService from '@/services/ReviewService';
import { Game, Review} from '@/types';
import { release } from 'os';
import React, { useEffect, useState } from 'react';

type Props = {
  toggleForm: () => void;
  onAddReview: (review: Review) => void;
  game?: Game;

};

const AddReview: React.FC<Props> = ({toggleForm, onAddReview, game}) => {
  const [stars, setStars] = useState<number>(1)
  const [description, setDescription] = useState('')

  const handleAddReview = async () => {
    if (!stars) {
      alert("star amount is required")
    }
    if (!description) {
      alert("description is required")
    }
    if (!game?.id) {
      alert("Game id is required")
    }

    const userString = localStorage.getItem('loggedInUser');

    let loggedInReviewerId: number;
    if(userString){
      const userObject = JSON.parse(userString);
      loggedInReviewerId = userObject.reviewerId;

      const newReview: Review = {
        stars,
        description,
        gameId: game?.id ?? 0,
        reviewerId: loggedInReviewerId,
      }
      await ReviewService.addReview(newReview);
      onAddReview(newReview);
      toggleForm();
    }
  }
  
  return (
    <>
    <form style={{display: 'grid'}}>
      <label>Stars</label>
      <select
          className="border p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={stars}
          onChange={(value) => setStars(Number(value.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      <label>Description</label>
        <input
          className="border p-2 mb-4 w-full"
          value={description}
          onChange={(value) => setDescription(value.target.value)}
        />
      <div>  
      <button
        className="bg-blue-500 text-black p-2 rounded-lg"
        onClick={toggleForm}
      >
        Cancel
      </button>
      <button
        className="bg-blue-500 text-black p-2 rounded-lg"
        onClick={handleAddReview}
      >
        Add Review
      </button>
      </div>
        </form>
    </>
  );
};

export default AddReview;