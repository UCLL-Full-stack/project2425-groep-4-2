import ReviewService from '@/services/ReviewService';
import { Review} from '@/types';
import { release } from 'os';
import React, { useState } from 'react';

type Props = {
  toggleForm: () => void;
  onAddReview: (review: Review) => void;
};

const AddReview: React.FC<Props> = ({toggleForm, onAddReview}) => {
  const [id, setId] = useState<number | undefined>()
  const [stars, setStars] = useState<number>(1)
  const [description, setDescription] = useState('')
  const [gameName, setGameName] = useState('')
  const [reviewerId, setReviewerId] = useState<number>(1)

  const handleAddReview = async () => {
    if (!stars) {
      alert("star amount is required")
    }
    if (!description) {
      alert("description is required")
    }
    if (!gameName) {
      alert("game is required")
    }

    const game = {name: gameName, genre: "", releaseDate: new Date(), developer: ""};

    const newReview: Review = {
      id,
      stars,
      description,
      game,
      reviewerId,
    }
    await ReviewService.addReview(newReview);
    onAddReview(newReview);
    toggleForm();
  }
  
  return (
    <>
    <form style={{display: 'grid'}}>
      <label>Id</label>
        <input
          type='number'
          className="border p-2 mb-4 w-full"
          value={id}
          onChange={(value) => setId(value.target.valueAsNumber)}
        />
        <label>Game</label>
        <input
          className="border p-2 mb-4 w-full"
          value={gameName}
          onChange={(value) => setGameName(value.target.value)}
        />
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
        <label>reviewer</label>
        <input
          type='number'
          className="border p-2 mb-4 w-full"
          value={reviewerId}
          onChange={(value) => setReviewerId(value.target.valueAsNumber)}
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