import {Language} from "../types";

const zh: Language = {
    title: "指令生成器",
    filePathKeyDesc: "文件夹所在路径",
    filePathValueDesc: "视频文件名",
    frameMargin: "剪切处的富裕帧数（类似于出血边）:",
    exportMode: "生成格式",
    silentThreshold: "音量阈值(%)",
    motionThreshold: "动画阈值(%)",
    whetherOpenAfterFinished: "是否在生成结束后打开文件",
    whetherUseGpuAcceleration: "是否使用GPU加速",
    copyButtonText: "复制指令到剪贴板",
    copySuccessfully: "复制成功",

    noticeToEnterFileName: "请先在上方输入文件名",

    chooseFileText: "拖拽文件 / 选择文件",
    chooseFileTip: "由于安全限制，您的文件不会被上传。因此，仅能获取到文件的名称",

    exportModeDescription: {
        default: "剪辑后的视频",
        premiere: "xml文件(支持导入premiere/达芬奇等)",
        "final-cut-pro": "final-cut-pro",
        "shotcut": "ShotCut格式",
        "json": "Json文件",
        "clip-sequence": "分别导出剪辑后的每个视频片段",
    }
};

export default zh;