import { useHistory } from "react-router-dom";
import React from 'react';

export const Item = () => {
    let history = useHistory();

    return (
        <div>
          <button onClick={() => history.goBack()}>Back</button>
        </div>
    );
};