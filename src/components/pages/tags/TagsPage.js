import React, { useState, useEffect } from 'react';

// own module imports
import Tagbutton from '../../gui/buttons/tagbutton/Tagbutton';
import InputfieldDark from '../../gui/inputs/InputfieldDark';

// css imports
import './TagsPage.css';

// third party imports
import firebase from 'firebase/app';

function TagsPage() {
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await firebase.firestore().collection('tags').get();
            setTagList(data.docs.map(doc => ({...doc.data()})));
        }
        fetchData();
    }, [])

    return (
        <div className="tags">
            <h1>Tags</h1>
            <label>Tags:</label>
            <InputfieldDark type="text" placeholder="Tags..." />
            <div className="tag-section">
            {
            tagList.map(tag => (
                <div className="tag">  
                    <Tagbutton id={tag.id}>{tag.name}</Tagbutton>
                    <p>{tag.counter} Beiträge</p>
                </div>
            ))
            }
            </div>
        </div>
    );
}

export default TagsPage;