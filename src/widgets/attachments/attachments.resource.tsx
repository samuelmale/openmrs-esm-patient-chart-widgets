import { openmrsFetch } from "@openmrs/esm-framework";

export function getAttachmentByUuid(
  attachmentUuid: string,
  abortController: AbortController
) {
  return openmrsFetch(`/ws/rest/v1/attachment/${attachmentUuid}`, {
    signal: abortController.signal
  });
}

export function getAttachments(
  patientUuid: string,
  includeEncounterless: boolean,
  abortController: AbortController
) {
  return openmrsFetch(
    `/ws/rest/v1/attachment?patient=${patientUuid}&includeEncounterless=${includeEncounterless}`,
    {
      signal: abortController.signal
    }
  );
}

export function createAttachment(
  patientUuid: string,
  file: File,
  fileCaption: string,
  abortController: AbortController,
  base64Content?: string
) {
  const formData = new FormData();
  formData.append("fileCaption", fileCaption);
  formData.append("patient", patientUuid);

  if (base64Content) {
    const emptyFile = new File([""], "randomfile");
    formData.append("file", emptyFile);
    formData.append("base64Content", base64Content);
  } else {
    formData.append("file", file);
  }

  return openmrsFetch(`/ws/rest/v1/attachment`, {
    method: "POST",
    signal: abortController.signal,
    body: formData
  });
}

export function deleteAttachment(
  attachmentUuid: string,
  abortController: AbortController
) {
  return openmrsFetch(`/ws/rest/v1/attachment/${attachmentUuid}`, {
    method: "DELETE",
    signal: abortController.signal
  });
}

export function getRandomImages() {
  return [
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg"
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg"
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg"
    },
    {
      src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
      thumbnail:
        "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_n.jpg"
    },
    {
      src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
      thumbnail:
        "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
      thumbnailWidth: 170,
      thumbnailHeight: 130,
      caption: "37H (gratispgraphy.com)"
    },
    {
      src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
      thumbnail:
        "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_n.jpg",
      caption: "8H (gratisography.com)"
    },
    {
      src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
      thumbnail:
        "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
      caption: "286H (gratisography.com)"
    },
    {
      src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
      thumbnail:
        "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
      thumbnailWidth: 170,
      thumbnailHeight: 130,
      tags: [{ value: "People", title: "People" }],
      caption: "315H (gratisography.com)"
    },
    {
      src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
      thumbnail:
        "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
      caption: "201H (gratisography.com)"
    },
    {
      src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
      alt: "Big Ben - London",
      thumbnail:
        "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg"
    },
    {
      src: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
      alt: "Red Zone - Paris",
      thumbnail:
        "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
      tags: [{ value: "People", title: "People" }]
    },
    {
      src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
      alt: "Wood Glass",
      thumbnail:
        "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg"
    },
    {
      src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
      thumbnail:
        "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg"
    },
    {
      src: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_n.jpg"
    },
    {
      src: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
      alt: "Cosmos Flower",
      thumbnail:
        "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_n.jpg"
    },
    {
      src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
      thumbnail:
        "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg"
    },
    {
      src: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
      thumbnail:
        "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_n.jpg"
    },
    {
      src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
      thumbnail:
        "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg"
    },
    {
      src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg"
    },
    {
      src: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/8/7476/28973628875_069e938525_n.jpg",
      thumbnailWidth: 170,
      thumbnailHeight: 130
    },
    {
      src: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
      thumbnail:
        "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_n.jpg"
    },
    {
      src: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
      thumbnail:
        "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_n.jpg",
      caption: "Untitled (moveast.me)"
    },
    {
      src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
      thumbnail:
        "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg"
    },
    {
      src: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
      thumbnail:
        "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_n.jpg"
    }
  ];
}
