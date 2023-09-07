import React from "react";

export function Post({post}) {
    const {author, title, body} = post
    return (
        <div class="card rounded-1" >
            <div class="card-body">
                <h5 class="card-title text-primary">{title}</h5>
                <p class="card-text">{body}</p>
                <p class="card-text"><small class="text-body-secondary">{author}</small> </p>
            </div>
        </div>
)}
