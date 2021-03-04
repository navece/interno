import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "react-email-editor";
import axios from "axios";
import { Button, Dropdown } from "semantic-ui-react";
import SaveDraftModal from "./SaveDraftModal";
import SendModal from "./SendModal";
import Head from "next/head";

axios.defaults.baseURL = "https://email-editor-interno.herokuapp.com/";

export default function Index() {
  const [state, setState] = useState({ title: "" });
  const [html, setHtml] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [array, setArray] = useState([]);
  const emailEditorRef = useRef(null);

  useEffect(() => {
    axios
      .get("/all")
      .then((res) => {
        setArray(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSend = () => {
    console.log("send");
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log(design);
      console.log(html);
      setHtml(html);
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design } = data;
      console.log(design);
      axios
        .post("/", { title: state.title, template: design })
        .then(() => {
          console.log("success");
          setOpenModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const onLoad = () => {
    // you can load your template here;
    axios
      .post("/draft", { title: state.title })
      .then((res) => {
        emailEditorRef.current.editor.loadDesign(res.data.template);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDraft = (title) => {
    setState({ title: title });
    let temp = array.find((doc) => {
      return doc.title === title;
    });
    emailEditorRef.current.editor.loadDesign(temp.template);
  };

  const handleInput = (e) => {
    setState({ title: e.target.value });
  };

  const handleDelete = () => {
    console.log(state);
    axios
      .post("/delete", { title: state.title })
      .then((doc) => {
        window.location.reload(false);
        console.log(doc.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design } = data;
      axios
        .post("/update", { title: state.title, template: design })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  return (
    <div style={{ background: "aliceblue", height: "100vh" }}>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        ></link>
      </Head>
      <SaveDraftModal
        handleClose={handleClose}
        handleCreate={handleCreate}
        handleInput={handleInput}
        handleOpen={handleOpen}
        open={openModal}
      />
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "40px",
        }}
      >
        <div onClick={handleSend}>
          <SendModal html={html} />
        </div>
        <div>
          <Button primary onClick={state.title ? handleUpdate : handleOpen}>
            Save to draft
          </Button>
        </div>
        <div>
          <Dropdown
            placeholder={state.title ? state.title : "Saved Designs"}
            search
            selection
            value={state.title}
            options={array.map((doc) => ({
              key: doc._id,
              text: doc.title,
              value: doc.title,
              onClick: () => handleDraft(doc.title),
            }))}
          />
        </div>
        <div>
          <Button primary onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
