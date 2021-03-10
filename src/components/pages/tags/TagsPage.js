import React, { useState, useEffect } from 'react';

// own module imports
import TagInput from '../../gui/inputs/tagInput/TagInput';
import Tagbutton from '../../gui/buttons/tagbutton/Tagbutton';

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

    // Verbindung zu TagInput Komponente um auf die eingegebenen Tags 
    // Zugriff zu bekommen.
    const callbackTags = (tags) => {
        // TODO muss noch implementiert werden!
    }

    return (
        <div className="tags">
            <h1>Tags</h1>
            <label>Tags:</label>
            <TagInput parentCallbackTags={callbackTags} />
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