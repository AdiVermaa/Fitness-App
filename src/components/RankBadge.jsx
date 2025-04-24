import React from 'react';

function RankBadge({ rank }) {
  return (
    <span className={`rank-badge rank-${rank}`}>
      {rank}-Rank
    </span>
  );
}

export default RankBadge;