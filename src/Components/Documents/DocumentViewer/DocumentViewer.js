import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Search from "../../SearchBar/SearchBar";
import ProfilePic from "../../Avtar/Avtar";
import axios from "axios";
import { Item } from "../../backButton/backButton";
import { Document, Page, pdfjs } from "react-pdf";
import { getToken } from "../../../Utils/Common";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function DocPreview() {
  const [error, setError] = useState(null);

  let params = useParams();
  const title = params.title;
  const path = window.location.href;
  const [fileURI, setFileURI] = useState("");
  const [mimeType, setMimeType] = useState("");

  //Array of MS Offie MimeTypes -- if document is one of these, use native MS Office preview
  const msOfficeMimeType = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    "application/vnd.ms-word.document.macroEnabled.12",
    "application/vnd.ms-word.template.macroEnabled.12",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    "application/vnd.ms-excel.sheet.macroEnabled.12",
    "application/vnd.ms-excel.template.macroEnabled.12",
    "application/vnd.ms-excel.addin.macroEnabled.12",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.template",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    "application/vnd.ms-powerpoint.addin.macroEnabled.12",
    "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
    "application/vnd.ms-powerpoint.template.macroEnabled.12",
    "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
  ];

  //Below variable will hold the JSX to be displayed and returned by this component
  var [viewerOptions, setViewerOptions] = useState("");

  // console.log(path)
  const id = path.slice(41, 77);

  //useEffect fires each time the page loads
  // get the content of the attached file
  // based on the content type, us different viewers to display the document
  useEffect(() => {
    //First find out content type
    axios
      .get(
        `https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}`,
        {
          headers: {
            Authorization: `Basic ${btoa(getToken())}`,
          },
        }
      )
      .then((response) => {
        setMimeType(response.data.entry.content["mimeType"]);
        setFileURI(
          `https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content`
        );
      });
  }, [id]);

  //set display string
  //Takes the file remote URI and mimeType as arguments
  function SelectDisplayMethod(props) {
    if (mimeType === "application/pdf") {
      //use https://www.npmjs.com/package/react-pdf package for displaying
      return DisplayUsingReactPDF();
    } else if (msOfficeMimeType.includes(mimeType)) {
      //use office apps external component for preview
      //https://stackoverflow.com/questions/27957766/how-do-i-render-a-word-document-doc-docx-in-the-browser-using-javascript
      return DisplayUsingOfficeApps();
    } else if (mimeType.startsWith("image/")) {
      // if file is an image file, use simple <img> tag
      return DisplayUsingImgTag();
    } else {
      // for any other file type, try using a simple <iframe>
      return DisplayUsingIFrame();
    }
  }

  function DisplayUsingReactPDF() {
    console.log("VIPUL --- inside displayUsingReactPDF function");
    var strOptions = {
      url:
        "https://cors-anywhere.herokuapp.com/" + fileURI + "?attachment=false",
      httpHeaders: {
        Authorization: `Basic ${btoa(getToken())}`,
        withCredentials: true,
        "X-Requested-With": "XMLHttpRequest",
      },
    };
    console.log("VIPUL --- strOptions is ", strOptions);

    return (
      <Document
        error="There was an error"
        onLoadError={console.error}
        title="myframe"
        id="myFrame"
        file={strOptions}
      >
        <Page pageNumber={1} />
      </Document>
    );
  }

  function DisplayUsingOfficeApps() {
    var token = getToken();
    var url =
      "https://view.officeapps.live.com/op/embed.aspx?src=" +
      fileURI +
      "?alf_ticket=" +
      token;
    console.log("URL being passed to microsoft: " + url);
    console.log(fileURI);
    console.log(token);
    return (
      <iframe src={url} width="700px" height="700px" frameborder="0">
        This is an embedded{" "}
      </iframe>
    );
  }
  function DisplayUsingImgTag() {
    return <div>Nothing to display - IMG</div>;
  }
  function DisplayUsingIFrame() {
    return <div>Nothing to display - iFrame</div>;
  }

  return (
    <Fragment>
      <div id="second_section">
        <h2>{title}</h2>
        <Search />
        <SelectDisplayMethod />
        <ProfilePic />
        <Item />
      </div>
    </Fragment>
  );
}

export default DocPreview;
