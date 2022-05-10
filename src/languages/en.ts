import {Language} from "../types";

const en: Language = {
    title: "Auto-Editor-Assistant",
    filePathKeyDesc: "Path of directory",
    filePathValueDesc: "Name of your video file",
    frameMargin: `Frame margin ("silent" frames on either side of the "loud" sections)`,
    exportMode: `Choose the export mode`,
    silentThreshold: "Threshold of audio(%)",
    motionThreshold: "Threshold of motion(%)",
    whetherOpenAfterFinished: "open the file after editing is done",
    whetherUseGpuAcceleration: "use GPU acceleration",
    copyButtonText: "copy the command to clipboard",
    copySuccessfully: "copy successfully",

    noticeToEnterFileName: "Please enter file name",

    exportModeDescription: {
        default: "single video",
        premiere: "xml file(can be imported to Premiere, Sony Vegas, Davinci, etc)",
        "final-cut-pro": "for final-cut-pro",
        "shotcut": "for ShotCut",
        "json": "json file",
        "clip-sequence": "create many video clips that can be imported and manipulated like normal",
    }

};

export default en;