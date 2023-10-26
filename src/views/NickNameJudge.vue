<script setup>
import axios from "axios";
import {ref, onMounted} from "vue";
import {Upload, Close} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'


const languages = ref(['中文', '英文', '阿语', '俄语'])
let selectedLang = ref('中文');
let isLanguageDisable = ref(false);
const nameStyles = ['pubg', 'lGame'];
let isNameStyleDisable = ref(false);
let selectStyle = ref('pubg');

let namesNumber = ref(100);
let isNamesNumberDisable = ref(false);

let referenceNames = [];
let selectedFileName = ref('暂无文件');
let isShowSpanCloseBtn = ref('0')

let realNames = [];
let aiNames = [];
let nameGroups = ref([]);

let activeGroupIndexes = ref({});
let activeOptionIndex = ref('');

let uploadingInp = ref(null);


let isShowQuestionPrompt = ref(false);

let answerArr=[];
let accuracy;

let isAnswerOver=ref(false);


onMounted(() => {
  getNickNames();
})

function getNickNames() {
  activeGroupIndexes.value = {};
  activeOptionIndex.value = ''
  const url = 'http://127.0.0.1:3000';
  const params = new URLSearchParams();
  params.append('language', selectedLang.value);
  params.append('nameStyle', selectStyle.value);
  params.append('namesNumber', namesNumber.value.toString());
  params.append('referenceNames', referenceNames);

  axios.post(url + '/getNames', params)
      .then(res => {
        aiNames = res.data.aiNames;
        realNames = res.data.realNames;
        nameGroups.value = groupNames(realNames, aiNames, namesNumber);
        isShowQuestionPrompt.value = true;
      })
}

function groupNames(realNames, aiNames, namesNumber,) {
  const result = [];
  let i = 0;
  while (i < namesNumber.value) {
    const randNumber = Math.random();
    let obj = {};
    if (randNumber < 0.5) {
      Reflect.set(obj, 'name', realNames[i]);
      Reflect.set(obj, 'isRealName', true);
    } else {
      Reflect.set(obj, 'name', aiNames[i]);
      Reflect.set(obj, 'isRealName', false);
    }
    Reflect.set(obj, 'isSelected', false);
    Reflect.set(obj, 'option', {
      true:{
        value:'正确',
        isSelected:false
      },
      false:{
        value:'错误',
        isSelected:false
      }
    });
    result.push(obj)
    i++
  }
  console.log(result)
  return result;
}

function selectOption(resultItem,item,optionIndex) {
  activeGroupIndexes.value[optionIndex]=resultItem.value;
  const obj={[optionIndex]:false}
  if(resultItem.value==='正确'&&item.isRealName||resultItem.value==='错误'&&!item.isRealName){
    Reflect.set(obj,optionIndex,true)
  }
  answerArr.push(obj)
}

function openFile(e) {
  const node = e.srcElement;
  const reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    referenceNames = reader.result.replace(/\[|(])|(")/g, '').split(',');
    selectedFileName.value = node.files[0].name;
    isShowSpanCloseBtn.value = '1';
    namesNumber.value = referenceNames.length;
    isLanguageDisable.value = true;
    isNameStyleDisable.value = true;
    isNamesNumberDisable.value = true
  }
  reader.readAsText(node.files[0])
}

function clearFile() {
  referenceNames = [];
  selectedFileName.value = '暂无文件';
  isShowSpanCloseBtn.value = '0';
  namesNumber.value = 100;
  isLanguageDisable.value = false;
  isNameStyleDisable.value = false;
  isNamesNumberDisable.value = false;
}

function submitQuestionnaire(){
  if(Reflect.ownKeys(activeGroupIndexes.value).length ===Number(namesNumber.value)){
    const rightNum=answerArr.filter(item=>{
      return Object.values(item)[0]
    }).length
    accuracy=rightNum/Number(namesNumber.value).toFixed(2)*100
    isAnswerOver.value=true;
  }else {
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

</script>
<template>
  <div id="nickName">
    <div id="header">
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
          <el-select v-model="selectStyle" placeholder="Select" :disabled="isNameStyleDisable">
            <el-option
                v-for="item in nameStyles"
                :key="item"
                :label="item"
                :value="item"
            />
          </el-select>
        </div>
        <div>
          <span>题目总数:</span>
          <el-input v-model="namesNumber" placeholder="Please input" :disabled="isNamesNumberDisable"/>
        </div>
        <div id="upload">
          <input ref="uploadingInp" id="uploadingInp" type="file" @change="openFile">
          <el-button type="primary" style="height: 30px;width: 60px;background:#57da9a;border:0">
            上传
            <el-icon class="el-icon--right">
              <Upload/>
            </el-icon>
          </el-button>
          <div id="spanContent">
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
    <div id="main">
      <div id="questionPrompt" v-show="isShowQuestionPrompt">
        <div class="content">
          <span>请判断下面每组人名是否是真实人名</span>
          <div v-if="isAnswerOver">
            <span>正确率为：</span>
            <span style="color: #719eff">{{accuracy}}%</span>
          </div>
          <div class="submitQuestionnaire">
            <el-button type="primary" text @click="submitQuestionnaire" style="height: 30px;width: 80px;background:#4aa7ca;border:0;color: #FFFFFF">
              提交答案
            </el-button>
          </div>
        </div>
      </div>
      <ul id="ulRoot">
        <li v-for="(item,itemIndex) in nameGroups" :class="{'selectLi':activeGroupIndexes[itemIndex]}">
          <span>{{ item.name }}</span>
          <div>
            <button v-for="resultItem in item.option" @click="selectOption(resultItem,item,itemIndex)" :class="{
              'selectBtn':activeGroupIndexes[itemIndex]===resultItem.value
            }">{{resultItem.value}}</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#nickName {
  background: #f8f8f8;

  #header {
    min-height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #dbdcdd;
    display: flex;
    justify-content: center;
    //position: sticky;
    .content {
      display: flex;
      justify-content: space-between;
      align-content: center;
      min-width: 1200px;
      margin: auto 0;
      letter-spacing: 0.5px;

      #upload {
        display: flex;
        align-items: center;

        #spanContent {
          margin-left: 5px;
          font-size: 12px;
          min-width: 120px;
          color: #9b9da1;
          display: flex;
          align-items: center;
        }

        #uploadingInp {
          opacity: 0;
          width: 80px;
          height: 30px;
          border-radius: 15px;
          position: absolute;
          z-index: 10;
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

  #main {
    display: flex;
    flex-direction: column;
    align-items: center;

    #questionPrompt {
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
        .submitQuestionnaire{
          margin-right: 20px;
          //color: #FFFFFF;
        }
      }
    }
    #ulRoot {
      width: 1200px;
      background: #ffffff;
      box-shadow: 0px -5px 10px -5px #efefef;
      margin: 15px 0;
      display: flex;
      flex-wrap: wrap;
      padding: 40px 0;
    }
    li {
      min-width: 250px;
      height: 50px;
      list-style: none;
      margin:5px 5px 5px 35px;
      padding: 5px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 2px solid #c6c5c5;
      span{
        margin-left: 10px;
      }
      button {
        width: 40px;
        height: 30px;
        border-radius: 5px;
        color: #719eff;
        border: 1px solid #719eff;
        background: #ffffff;
        margin: 0 2px;
      }
      button:hover{
        //color: #FFFFFF;
        border-color:#57da9d ;
        background:#57da9d ;
      }
      .selectBtn{
        border-color:#74d898 ;
        background: #74d898;
        color: #FFFFFF;
      }
    }
    li:hover{
      border-color: #57da9d;
    }
    .selectLi{
      border-color:#74d898;
    }
  }
}
</style>
