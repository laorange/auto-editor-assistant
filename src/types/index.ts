export interface FilePath {
    key: string,
    value: string,
}

interface strKeyObj {
    [key: string]: string | strKeyObj
}

export interface Language {
    title: string,
    filePathKeyDesc: string,
    filePathValueDesc: string,
    frameMargin: string,
    exportMode: string,
    silentThreshold: string,
    motionThreshold: string,
    whetherOpenAfterFinished: string,
    whetherUseGpuAcceleration: string,
    copyButtonText: string,
    copySuccessfully: string,

    noticeToEnterFileName: string,

    chooseFileText: string,
    chooseFileTip: string,

    exportModeDescription: strKeyObj

    [key: string]: string | strKeyObj
}