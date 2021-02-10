import React, { useState } from 'react';

// css imports
import './TagInput.css';

// material-ui icon imports
import { Cancel } from '@material-ui/icons';

// material-ui icon imports
import {
    PostAdd,
} from '@material-ui/icons';

const TagInput = () => {
    const [tags, setTags] = useState([]);

    const addTag = () => {
        let tag = document.getElementById('tag-inputfield').value;
        if (tag !== "") {
            setTags([...tags, tag]);
            document.getElementById('tag-inputfield').value = "";
        }
    }

    const removeTags = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    }

    return (
        <div>
            <div className="tags-input">
                <input type="text" id="tag-inputfield" placeholder="z.B. Dividendenaktien, Amazon, USA, ......" onKeyUp={e => (e.key === "Enter" ? addTag(e) : null)} />
                <button onClick={() => addTag()}><PostAdd /></button>
            </div>
            <ul id="tags">
            {
            tags.map((tag, index) => (
                <li key={index} className="tag-listitem">
                    <span className="tag-title">{tag}</span>
                    <span className="tag-close-icon" onClick={() => removeTags(index)}><Cancel /></span>
                </li>
                )
            )
            }
            </ul>
        </div>
    )
}

export default TagInput;