"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { uploadData } from "aws-amplify/storage";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const { user, signOut } = useAuthenticator();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  async function imageUpload() {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (!fileInput?.files?.[0]) {
      alert("Please select a file");
      return;
    }

    const file = fileInput.files[0];
    const fileReader = new FileReader();
    
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result;
        if (!arrayBuffer) {
          throw new Error("File reader failed to read file");
        }

        await uploadData({
          data: arrayBuffer,
          path: `art/${file.name}`,
          options: {
            bucket: {
              bucketName: "amplify-d28yvtaq3spb0b-main--gallerybucket0d10a12d-nwa7vcma48js",
              region: "us-west-1"
            }
          }
        });

        alert("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file", error);
        alert("Failed to upload file");
      } 
    };
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)}
          key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <div>
        <input type="file" id="file" />
        <button id="upload" onClick={imageUpload}>Upload</button>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
