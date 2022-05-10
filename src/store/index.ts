import {defineStore} from "pinia";
import {FilePath} from "../types";

type State = {
    filePaths: FilePath[],
    formData: {
        // ["default", "premiere", "final-cut-pro", "shotcut", "json", "audio", "clip-sequence"]
        frameMargin: number,
        exportMode: "default" | "premiere" | "final-cut-pro" | "shotcut" | "json" | "clip-sequence",
        silentThreshold: number,
        motionThreshold: number,
        whetherOpenAfterFinished: boolean,
    }
}

function joinFilePath(filePath: FilePath) {
    let key = filePath.key
    let value = filePath.value

    key = key.replace('/', '\\')
    if (key.endsWith('\\')) {
        key = key.slice(0, -1)
    }
    if (key.length) {
        key = key + "\\"
    }

    // 默认后缀Mp4
    if (value.search(/\.\w+$/) === -1) {
        value += '.mp4'
    }

    return `${key}${value}`
}

export const useStore = defineStore('store', {
    state(): State {
        return {
            filePaths: [{key: "", value: ""}],
            formData: {
                frameMargin: 2,
                exportMode: "premiere",
                silentThreshold: 4,
                motionThreshold: 0,
                whetherOpenAfterFinished: false
            },
        }
    },
    getters: {
        inputFilesCmd(): string {
            return this.filePaths.map(fp => joinFilePath(fp)).join(" ")
        },
        whetherFilePathIsValid(): boolean {
            for (const filePath of this.filePaths) {
                if (!filePath.value.length) {
                    return false
                }
            }
            return true
        },
        frameMarginCmd(): string {
            return `--frame-margin ${this.formData.frameMargin}`
        },
        editCmd(): string {
            if (this.formData.silentThreshold === 0 && this.formData.motionThreshold === 0) {
                return "--edit none"
            } else if (this.formData.silentThreshold !== 0 && this.formData.motionThreshold === 0) {
                return `--silent-threshold ${this.formData.silentThreshold}%`
            } else if (this.formData.silentThreshold === 0 && this.formData.motionThreshold !== 0) {
                return `--edit motion:threshold=${this.formData.motionThreshold}%`
            } else {
                return `--edit 'audio:threshold=${this.formData.silentThreshold}% or motion:threshold=${this.formData.motionThreshold}%'`;
            }
        },
        exportModeCmd(): string {
            return `--export ${this.formData.exportMode}`
        },
        noOpenCmd(): string {
            return !this.formData.whetherOpenAfterFinished ? "--no-open" : ""
        },
        videoQualityScaleCmd() {
            return "--video-quality-scale 1"
        },
        command() {
            let cmdList: string[] = ["auto-editor"]
            // 文件名
            cmdList.push(this.inputFilesCmd)
            cmdList.push(this.frameMarginCmd)
            cmdList.push(this.editCmd)
            cmdList.push(this.exportModeCmd)
            cmdList.push(this.videoQualityScaleCmd)
            cmdList.push(this.noOpenCmd)

            return cmdList.reduce((r: string[], cmd) => {
                if (cmd.length) r.push(cmd)
                return r
            }, []).join(" ")
        },
    }
})