import React, { useState } from 'react';

// css imports
import './TagInput.css';

// material-ui icon imports
import { Cancel } from '@material-ui/icons';

const TagInput = props => {
    const [tags, setTags] = useState([]);

    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    }

    const removeTags = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    }

    return (
        <div className="tags-input">
            <input type="text" placeholder="Enter drücken zum hinzufügen..." onKeyUp={e => (e.key === "Enter" ? addTags(e) : null)} />
            <ul id="tags">
                {
                    tags.map((tag, index) => (
                        <li key={index} className="tag-listitem">
                            <span className="tag-title">{tag}</span>
                            <span className="tag-close-icon" onClick={() => removeTags(index)}><Cancel /></span>
                        </li>)
                    )
                }
            </ul>
        </div>
    )
}

export default TagInput;