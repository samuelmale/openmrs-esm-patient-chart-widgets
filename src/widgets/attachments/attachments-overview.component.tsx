import React, { useState, useEffect } from "react";
import { useCurrentPatient, UserHasAccess } from "@openmrs/esm-framework";
import {
  getAttachments,
  createAttachment,
  deleteAttachment,
  getRandomImages
} from "./attachments.resource";
import Gallery from "react-grid-gallery";
import styles from "./attachments-overview.scss";
import CameraUpload from "./camera-upload.component";
import { Trans } from "react-i18next";
import AttachmentThumbnail from "./attachment-thumbnail.component";
import dayjs from "dayjs";
import Button from "carbon-components-react/lib/components/Button";
import Add16 from "@carbon/icons-react/es/add/16";
import PatientChartPagination from "../../ui-components/pagination/pagination.component";
import paginate from "../../utils/paginate";
import { Modal } from "./modal.component";

export default function AttachmentsOverview() {
  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [, , patientUuid] = useCurrentPatient();
  const [randomImageArray, setRandomImageArray] = useState<Array<any>>([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState<Array<any>>([]);
  const [showCam, setShowCam] = useState(false);

  useEffect(() => {
    if (patientUuid) {
      const abortController = new AbortController();
      getAttachments(patientUuid, true, abortController).then(
        (response: any) => {
          const listItems = response.data.results.map(attachment => ({
            id: `${attachment.uuid}`,
            src: `/openmrs/ws/rest/v1/attachment/${attachment.uuid}/bytes`,
            thumbnail: `/openmrs/ws/rest/v1/attachment/${attachment.uuid}/bytes`,
            thumbnailWidth: 170,
            thumbnailHeight: 130,
            caption: attachment.comment,
            isSelected: false,
            dateTime: dayjs(attachment.dateTime).format("YYYY-MM-DD HH:mm:ss"),
            bytesMimeType: attachment.bytesMimeType,
            bytesContentFamily: attachment.bytesContentFamily
          }));
          setAttachments(listItems);
        }
      );
    }
  }, [patientUuid]);

  /**
   * TODO: This should be removed, it sets mock data
   */
  // useEffect(() => {
  //   setRandomImageArray(
  //     getRandomImages().map(i => {
  //       i["thumbnailWidth"] = 170;
  //       i["thumbnailHeight"] = 140;
  //       i["caption"] = undefined;
  //       i["bytesContentFamily"] = "IMAGE";
  //       return i;
  //     })
  //   );
  // }, []);

  useEffect(() => {
    if (attachments.length) {
      const [page, allPages] = paginate<any>(attachments, pageNumber, 8);
      setCurrentPage(page);
    }
  }, [attachments, pageNumber]);

  function handleUpload(e: React.SyntheticEvent, files: FileList | null) {
    e.preventDefault();
    e.stopPropagation();
    const abortController = new AbortController();
    if (files) {
      const attachments_tmp = attachments.slice();
      const result = Promise.all(
        Array.prototype.map.call(files, file =>
          createAttachment(patientUuid, file, file.name, abortController).then(
            (response: any) => {
              const new_attachment = {
                id: `${response.data.uuid}`,
                src: `/openmrs/ws/rest/v1/attachment/${response.data.uuid}/bytes`,
                thumbnail: `/openmrs/ws/rest/v1/attachment/${response.data.uuid}/bytes?view=complexdata.view.thumbnail`,
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                caption: response.data.comment,
                isSelected: false,
                dateTime: dayjs(response.data.dateTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
                bytesMimeType: response.data.bytesMimeType,
                bytesContentFamily: response.data.bytesContentFamily
              };
              attachments_tmp.push(new_attachment);
            }
          )
        )
      );
      result.then(() => setAttachments(attachments_tmp));
    }
  }

  function handleDragOver(e: React.SyntheticEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleCurrentImageChange(index: number) {
    setCurrentImage(index);
  }

  function handleImageSelect(index: number) {
    const attachments_tmp = attachments.slice();
    const attachment = attachments_tmp[index];
    if (attachment.hasOwnProperty("isSelected")) {
      attachment.isSelected = !attachment.isSelected;
    } else {
      attachment.isSelected = true;
    }
    setAttachments(attachments_tmp);
  }

  function getSelectedImages() {
    let selected = [];
    attachments.forEach((att, index) => {
      if (att.isSelected === true) {
        selected.push(att);
      }
    });
    return selected;
  }

  function deleteSelected() {
    setAttachments(attachments =>
      attachments.filter(att => att.isSelected !== true)
    );
    const selected = attachments.filter(att => att.isSelected === true);
    const abortController = new AbortController();
    const result = Promise.all(
      selected.map(att =>
        deleteAttachment(att.id, abortController).then((response: any) => {})
      )
    );
    result.then(() => {});
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this attachment?")) {
      const abortController = new AbortController();
      const id = attachments[currentImage].id;
      deleteAttachment(id, abortController).then((response: any) => {
        const attachments_tmp = attachments.filter(att => att.id != id);
        setAttachments(attachments_tmp);
      });
    }
  }

  function handleNewAttachment(att: Attachment) {
    const attachments_tmp = attachments.slice();
    attachments_tmp.push(att);
    setAttachments(attachments_tmp);
  }

  return (
    <UserHasAccess privilege="View Attachments">
      <div
        className={styles.overview}
        onPaste={e => handleUpload(e, e.clipboardData.files)}
        onDrop={e => handleUpload(e, e.dataTransfer.files)}
        onDragOver={handleDragOver}
      >
        {showCam && (
          <Modal>
            <CameraUpload
              onNewAttachment={handleNewAttachment}
              openCameraOnRender={true}
              shouldNotRenderButton={true}
              closeCamera={() => setShowCam(false)}
            />
          </Modal>
        )}
        {getSelectedImages().length !== 0 && (
          <UserHasAccess privilege="Delete Attachment">
            <div className={styles.actions}>
              <button
                onClick={deleteSelected}
                className={`omrs-btn omrs-filled-action`}
              >
                <Trans i18nKey="deleteSelected">Delete selected</Trans>
              </button>
            </div>
          </UserHasAccess>
        )}

        <div id="container" className={styles.galleryContainer}>
          <div className={styles.attachmentsHeader}>
            <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>
              Attachments
            </h4>
            <Button
              kind="ghost"
              renderIcon={Add16}
              iconDescription="Add attachment"
              onClick={e => setShowCam(true)}
            >
              Add
            </Button>
          </div>
          <Gallery
            images={currentPage}
            currentImageWillChange={handleCurrentImageChange}
            customControls={[
              <Button
                kind="danger"
                onClick={handleDelete}
                className={styles.btnOverrides}
              >
                Delete
              </Button>
            ]}
            onSelectImage={handleImageSelect}
            thumbnailImageComponent={AttachmentThumbnail}
            margin={3}
          />
          <PatientChartPagination
            items={attachments}
            onPageNumberChange={prop => setPageNumber(prop.page)}
            pageNumber={pageNumber}
            pageSize={8}
            pageUrl=""
            currentPage={currentPage}
          />
        </div>
      </div>
    </UserHasAccess>
  );
}

export type Attachment = {
  id: string;
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  caption: string;
  isSelected: boolean;
  dateTime?: string;
  bytesMimeType?: string;
  bytesContentFamily?: string;
};
