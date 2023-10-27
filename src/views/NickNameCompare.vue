<script setup>
import axios from "axios";
import {ref, onMounted, computed} from "vue";
import {Upload, Close} from '@element-plus/icons-vue';
import {ElMessageBox} from 'element-plus';


const languages = ref(['中文', '英文', '阿语', '俄语']);
let selectedLang = ref('中文');
let isLanguageDisable = ref(false);

const nameStyles = ['pubg', 'lGame'];
let selectedStyle = ref('pubg');
let isNameStyleDisable = ref(false);

let oneGroupNameNum = ref(5);
let isOneGroupNameNumDisable = ref(false);
let optionGroupNum = ref(10);
let isNamesNumberDisable = ref(false);

let referenceNames = [];//打开文件时的names，也是传给后端的names
let selectedFileName = ref('暂无文件');
let isShowSpanCloseBtn = ref('0');

let realNames = [];
let aiNames = [];
let nameGroups = ref([]);

let isShowQuestionPrompt = ref(false);
//有关答案的一些配置
let config = {
  recurrentSelection: true,//是否可以重复选择答案选项
  showResultsImmediately: false,//是否立即显示答案
}

let isFinishAnswer = ref(false);
let accuracy = 0;

let selectedObj = ref({});

onMounted(() => {
  getNickNames();
})

const allNamesNum = computed(() => {
  return oneGroupNameNum.value * optionGroupNum.value;
});


function submitQuestionnaire() {
  const results=Object.values(selectedObj.value);
  let selectedOptionsNum=results.length;
  if (selectedOptionsNum === Number(optionGroupNum.value)) {
    const rightOptionsNum = results.filter(item => {return item.includes('real')}).length;
    accuracy = (rightOptionsNum / optionGroupNum.value).toFixed(2) * 100;
    isFinishAnswer.value = true;
  } else {
    ElMessageBox.alert('題目还未答完，请继续答题', '提示', {
      // if you want to disable its autofocus
      // autofocus: false,
      confirmButtonText: 'OK',
      // callback: (action) => {
      //   ElMessage({
      //     type: 'info',
      //     message: `action: ${action}`,
      //   })
      // },
    })
  }
}

function getNickNames() {
  selectedObj.value={};
  isFinishAnswer.value = false;
  accuracy = 0
  const url = 'http://127.0.0.1:3000';
  const params = new URLSearchParams();
  params.append('language', selectedLang.value);
  params.append('nameStyle', selectedStyle.value);
  params.append('namesNumber', allNamesNum.value.toString());
  params.append('referenceNames', referenceNames);
  axios.post(url + '/getNames', params)
      .then(res => {
        aiNames.value = res.data.aiNames;
        realNames.value = res.data.realNames;
        nameGroups.value = groupNames(realNames.value, aiNames.value, allNamesNum.value, oneGroupNameNum.value);
        isShowQuestionPrompt.value = true;
      })
}

function groupNames(realNames, aiNames, allNamesNum, oneGroupNameNum) {
  const result = [];
  let i = 0;
  while (i < allNamesNum) {
    if (i % oneGroupNameNum === 0) {
      const randNumber = Math.random();
      let option;
      if (randNumber < 0.5) {
        option = {
          realNamesGroup: {
            names: [],
          },
          aiNamesGroup: {
            names: [],
          },
        }
      } else {
        option = {
          aiNamesGroup: {
            names: [],
          },
          realNamesGroup: {
            names: [],
          },
        }
      }
      result.push(option);
    }
    const resLength = result.length;
    result[resLength - 1].realNamesGroup.names.push(realNames[i]);
    result[resLength - 1].aiNamesGroup.names.push(aiNames[i]);
    i++;
  }
  return result;
}

function selectOption(groupIndex, name) {
  if (!config.recurrentSelection) {
    if(!Reflect.has(selectedObj.value, groupIndex)){
      Reflect.set(selectedObj.value, groupIndex, name);
    }
  } else {
    Reflect.set(selectedObj.value, groupIndex, name);
  }
}

function openFile(e) {
  const node = e.srcElement;
  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    referenceNames = reader.result.replace(/\[|(])|(")/g, '').split(',');
    selectedFileName.value = node.files[0].name;
    isShowSpanCloseBtn.value = '1';
    optionGroupNum.value = referenceNames.length / oneGroupNameNum.value;
    isLanguageDisable.value = true;
    isNameStyleDisable.value = true;
    isNamesNumberDisable.value = true;
    isOneGroupNameNumDisable.value = true;
  }
  reader.readAsText(node.files[0]);
}

function clearFile() {
  referenceNames = [];
  selectedFileName.value = '暂无文件';
  isShowSpanCloseBtn.value = '0';
  isLanguageDisable.value = false;
  isNameStyleDisable.value = false;
  isNamesNumberDisable.value = false;
  isOneGroupNameNumDisable.value = false;
}

</script>

<template>
  <div id="nickName">
    <div class="header">
      <div class="content">
        <div>
          <span>语言:</span>
          <el-select v-model="selectedLang" placeholder="Select" :disabled="isLanguageDisable">
            <el-option
                v-for="item in languages"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </div>
        <div>
          <span>风格:</span>
          <el-select v-model="selectedStyle" placeholder="Select" :disabled="isNameStyleDisable">
            <el-option
                v-for="item in nameStyles"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </div>
        <div>
          <span>每组数量:</span>
          <el-input v-model="oneGroupNameNum" placeholder="Please input" :disabled="isOneGroupNameNumDisable"/>
        </div>
        <div>
          <span>题目组数:</span>
          <el-input v-model="optionGroupNum" placeholder="Please input" :disabled="isNamesNumberDisable"/>
        </div>
        <div class="upload">
          <input class="upload-input" type="file" @change="openFile">
          <el-button type="primary" style="height: 30px;width: 60px;background:#57da9a;border:0">
            上传
            <el-icon class="el-icon--right">
              <Upload/>
            </el-icon>
          </el-button>
          <div class="span-content">
            <span>{{ selectedFileName }}</span>
            <el-icon @click="clearFile" :size="16" color="#9b9da1" style="cursor: pointer;border:1px solid #9b9da1;border-radius: 5px;margin-left: 3px" :style="{'opacity':isShowSpanCloseBtn}">
              <Close/>
            </el-icon>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="getNickNames" style="height: 30px;width: 80px;background:#5e9eff;border:0">
            生成名字
          </el-button>
        </div>

      </div>
    </div>
    <div class="main">
      <div class="question-prompt" v-show="isShowQuestionPrompt">
        <div class="content">
          <span>请在下面每组中选择出你认为是真实人名的选项</span>
          <div v-if="isFinishAnswer">
            <span>正确率为：</span>
            <span style="color: #719eff">{{ accuracy }}%</span>
          </div>
          <div class="submit-btn">
            <el-button type="primary" text @click="submitQuestionnaire" style="height: 30px;width: 80px;background:#4aa7ca;border:0;color: #FFFFFF">
              提交答案
            </el-button>
          </div>
        </div>
      </div>
      <ul class="questionnaire">
        <li v-for="(group,groupIndex) in nameGroups">
          <ul>
            <li class="option-base" v-for="(option,name,optionIndex) in group" @click="selectOption(groupIndex,name)"
                :class="[
                {'option':!(groupIndex in selectedObj&&selectedObj[groupIndex]===name)},
                {'option-item_true':groupIndex in selectedObj&&selectedObj[groupIndex]===name&&(config.recurrentSelection||name.includes('real'))},
                {'option-item_false':groupIndex in selectedObj&&selectedObj[groupIndex]===name&&(name.includes('ai')&&config.showResultsImmediately)},
                ]">
              <div class="option-label">{{ ["A", "b"][optionIndex] }}</div>
              <div class="option-content">{{ option.names.join(' , ') }}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#nickName {
  background: #f8f8f8;
  .header {
    min-height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #dbdcdd;
    display: flex;
    justify-content: center;
    .content {
      display: flex;
      justify-content: space-between;
      align-content: center;
      min-width: 1200px;
      margin: auto 0;
      letter-spacing: 0.5px;
      .upload {
        display: flex;
        align-items: center;
        .upload-input {
          opacity: 0;
          width: 80px;
          height: 30px;
          border-radius: 15px;
          position: absolute;
          z-index: 10;
        }
        .span-content {
          margin-left: 5px;
          font-size: 12px;
          min-width: 120px;
          color: #9b9da1;
          display: flex;
          align-items: center;
        }
      }

      :deep(.el-select) {
        width: 100px;
        .el-input {
          height: 30px;
        }
      }
      :deep(.el-input) {
        width: 100px;
        height: 30px;
      }
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    .question-prompt {
      position: sticky;
      top: 0;
      width: 100%;
      height: 60px;
      background: #ffffff;
      box-shadow: 0 10px 10px -5px #dedede;
      display: flex;
      justify-content: center;
      z-index: 1000;
      .content {
        min-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        letter-spacing: 1px;
        .submit-btn {
          margin-right: 20px;
        }
      }
    }
    .questionnaire {
      min-width: 1200px;
      background: #ffffff;
      box-shadow: 0px -5px 10px -5px #efefef;
      margin: 15px 0;
      > li {
        list-style: none;
        margin: 5px;
        padding: 5px;
        border-bottom: 1px dotted #c6c5c5;
      }
      > li:last-child {
        border: 0;
      }
      ul {
        margin-top: 10px;
        padding: 5px;
        .option-base {
          display: flex;
          line-height: 30px;
          padding: 5px;
          border-radius: 8px;
          min-width: 500px;
          margin: 1px 0;
          cursor: pointer;
          border: 1px solid #ffffff;
          .option-label {
            width: 30px;
            height: 30px;
            border: 1px solid #e6e6e6;
            border-radius: 15px;
            margin: 0 5px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .option {
          border: 1px solid #ffffff;
        }
        .option:hover {
          background: #f8f8f8;
          .option-label {
            background: #32ca99;
            border-color: #32ca99;
            color: #ffffff;
          }
        }
        .option-item_true {
          border: 1px solid #9de2c9;
          background: #effaf7;
          .option-label {
            background: #32ca99;
            border: 1px solid #32ca99;
            color: #ffffff;
          }
        }
        .option-item_false {
          border: 1px solid #ffbba4;
          background: #fff6f3;
          .option-label {
            background: #ff561b;
            border: 1px solid #ff561b;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
