<script setup>
import axios from "axios";
import {ref,onMounted} from "vue";
import { Upload,Close } from '@element-plus/icons-vue'


const languages=ref(['中文','英文','阿语','俄语'])
let selectedLang=ref('中文');
let isLanguageDisable=ref(false);
const nameStyles=['pubg','lGame'];
let isNameStyleDisable=ref(false);
let selectStyle=ref('pubg');

let oneGroupNameNum=ref(5);
let namesNumber=ref(100);
let isNamesNumberDisable=ref(false);

let referenceNames=[];
let selectedFileName=ref('暂无文件');
let isShowSpanCloseBtn=ref('0')

let realNames=[];
let aiNames=[];
let nameGroups=ref([]);

let activeGroupIndexes=ref([]);
let activeOptionIndex=ref('');

let uploadingInp=ref(null);
const optionLabels=[
    'A','B','C','D','E','F','G','H','I','J'
];
let isShowQuestionPrompt=ref(false);

onMounted(()=>{
  getNickNames();
})

function getNickNames(){
  activeGroupIndexes.value=[];
  activeOptionIndex.value=''
  const url='http://127.0.0.1:3000';
  const params = new URLSearchParams();
  params.append('language', selectedLang.value);
  params.append('nameStyle', selectStyle.value);
  params.append('namesNumber', namesNumber.value.toString());
  params.append('referenceNames',referenceNames);
  // console.log(111)
  axios.post(url+'/getNames',params)
      .then(res=>{
        aiNames=res.data.aiNames;
        realNames=res.data.realNames;
        nameGroups.value=groupNames(realNames,aiNames,namesNumber,oneGroupNameNum);
        isShowQuestionPrompt.value=true;
      })
}
function groupNames(realNames,aiNames,namesNumber,oneGroupNameNum){
  const result=[];
  let i=0;
  while (i<namesNumber.value){
    if(i%oneGroupNameNum.value===0){
      const randNumber=Math.random();
      let obj;
      if(randNumber<0.5){
        obj={
          option:{
            realNamesGroup: {
              names:[],
              isRealName:true
            },
            aiNamesGroup:{
              names:[],
              isRealName:false
            },
          },
          selectedName:undefined
        }
      }else{
        obj={
          option: {
            aiNamesGroup:{
              names:[],
              isRealName:false
            },
            realNamesGroup:{
              names:[],
              isRealName:true
            },
          },
          selectedName:undefined
        }
      }
      result.push(obj)
    }
    const resLength=result.length;
    result[resLength-1].option.realNamesGroup.names.push(realNames[i])
    result[resLength-1].option.aiNamesGroup.names.push(aiNames[i])
    i++
  }
  console.log(result.value)
  return result;
}

function selectOption(groupIndex,optionIndex,name,group){
  let index=activeGroupIndexes.value.indexOf(groupIndex)
  if(index===-1){
    activeGroupIndexes.value.push(groupIndex);
    group.selectedName=name
  }
  activeOptionIndex.value=groupIndex+'~'+optionIndex;

}

function openFile(e){
  const node=e.srcElement;
  const reader=new FileReader();
    reader.onload=function fileReadCompleted(){
      referenceNames=reader.result.replace(/\[|(])|(")/g,'').split(',');
      // console.log(referenceNames)
      selectedFileName.value=node.files[0].name;
      isShowSpanCloseBtn.value='1';
      namesNumber.value=referenceNames.length;
      isLanguageDisable.value=true;
      isNameStyleDisable.value=true;
      isNamesNumberDisable.value=true
    }
    reader.readAsText(node.files[0])
}

function clearFile(){
  referenceNames=[];
  selectedFileName.value='暂无文件';
  isShowSpanCloseBtn.value='0';
  namesNumber.value=100;
  isLanguageDisable.value=false;
  isNameStyleDisable.value=false;
  isNamesNumberDisable.value=false;
  // console.log(typeof uploadingInp.value.files)
  // uploadingInp.value.files=null;
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
            <span>每组数量:</span>
            <el-input v-model="oneGroupNameNum" placeholder="Please input" />
          </div>
          <div>
            <span>题目总数:</span>
            <el-input v-model="namesNumber" placeholder="Please input" :disabled="isNamesNumberDisable"/>
          </div>
          <div id="upload" >
            <input ref="uploadingInp" id="uploadingInp" type="file" @change="openFile">
<!--            <el-row class="mb-4">-->
<!--              <el-button @click="" type="success" round style="height: 30px;width: 80px; border-radius: 15px;background:#57da9a;">上传文件<el-icon class="el-icon&#45;&#45;right"><Upload /></el-icon></el-button>-->
<!--            </el-row>-->
            <el-button type="primary" style="height: 30px;width: 60px;background:#57da9a;border:0" >
              上传<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
            <div id="spanContent">
              <span>{{selectedFileName}}</span>
              <el-icon @click="clearFile" :size="16" color="#9b9da1" style="cursor: pointer;border:1px solid #9b9da1;border-radius: 5px;margin-left: 3px" :style="{'opacity':isShowSpanCloseBtn}">
                <Close />
              </el-icon>
            </div>


          </div>
          <div>
            <!--          <el-row class="mb-4">-->
            <!--            <el-button @click="getNickNames" type="success" round style="height: 30px;width: 80px; border-radius: 15px;background:#57da9a;">生成名字-->
            <!--            </el-button>-->
            <!--          </el-row>-->
            <el-button type="primary"  @click="getNickNames" style="height: 30px;width: 80px;background:#5e9eff;border:0">
              生成名字
            </el-button>
          </div>

        </div>
      </div>
      <div id="main">
        <div id="questionPrompt" v-show="isShowQuestionPrompt">
          <div class="content">
            <span>请在下面每组中选择出你认为是真实人名的选项（结果绿色为正确，红色为错误）</span>
          </div>
        </div>
        <ul id="ulRoot">
          <li v-for="(group,groupIndex) in nameGroups" >
            <ul>
              <li v-for="(value,name,optionIndex) in group.option"
                  :class="['option-item-base',
                 {'option-item':typeof group.selectedName==='undefined'},
                 {'option-item_true':(activeGroupIndexes.indexOf(groupIndex)!==-1&&group.selectedName===name)&&value.isRealName},
                 {'option-item_false':(activeGroupIndexes.indexOf(groupIndex)!==-1&&group.selectedName===name)&&!value.isRealName}
                 ]"
                  @click="selectOption(groupIndex,optionIndex,name,group)">
                <div class="label" :class="[
                 {'option-item-label_true':(activeGroupIndexes.indexOf(groupIndex)!==-1&&group.selectedName===name)&&value.isRealName},
                 {'option-item-label_false':(activeGroupIndexes.indexOf(groupIndex)!==-1&&group.selectedName===name)&&!value.isRealName}
            ]">{{ optionLabels[optionIndex] }}</div>
                <div class="content">{{value.names.join(' , ')}}</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  </div>
</template>

<style lang="scss" scoped>

#nickName{
  background: #f8f8f8;
  #header{
    min-height: 60px;
    background: #ffffff;
    border-bottom: 1px solid #dbdcdd;
    display: flex;
    justify-content: center;
    //position: sticky;
    .content{
      display: flex;
      justify-content: space-between;
      align-content: center;
      min-width: 1200px;
      margin: auto 0;
      letter-spacing:0.5px;
      #upload{
        display: flex;
        align-items: center;
        #spanContent{
          margin-left: 5px;
          font-size: 12px;
          min-width: 120px;
          color: #9b9da1;
          display: flex;
          align-items: center;
        }

        #uploadingInp{
          opacity: 0;
          width: 80px;
          height: 30px;
          border-radius: 15px;
          position: absolute;
          z-index: 10;
        }
      }

      :deep(.el-select){
        width: 100px;
        .el-input {
          height: 30px;
        }
      }
      :deep(.el-input){
        width: 100px;
        height: 30px;
      }
    }
  }

  #main{
    display: flex;
    flex-direction: column;
    align-items: center;
    #questionPrompt{
      position: sticky;
      top: 0;
      width: 100%;
      height: 60px;
      background: #ffffff;
      box-shadow: 0 10px 10px -5px #dedede;
      //box-shadow: 0 1px 4px 0 rgba(0,0,0,.02), 0 2px 12px 0 rgba(0,0,0,.04);
      display: flex;
      justify-content: center;
      z-index: 1000;
      .content{
        min-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        letter-spacing: 1px;
      }
    }
  }
}

#ulRoot{
  min-width: 1200px;
  background: #ffffff;
  box-shadow: 0px -5px 10px -5px #efefef;
  margin-top: 15px;
}

#ulRoot>li{
  list-style: none;
  margin: 5px;
  padding: 5px;
  border-bottom: 1px dotted #c6c5c5;
}
#ulRoot ul{
  margin-top: 10px;
  padding: 5px;

}
.option-item-base{
  display: flex;
  line-height: 30px;
  padding: 5px;
  border-radius: 8px;
  min-width: 500px;
  margin: 1px 0;
  cursor: pointer;
  border: 1px solid #ffffff;
}
.option-item{
  border: 1px solid #ffffff;
}
.option-item:hover{
  background: #f8f8f8;
}
.option-item:hover .label{
  background: #32ca99;
  border-color: #32ca99;
  color: #ffffff;
}
.option-item_true{
  border: 1px solid #9de2c9;
  background: #effaf7;
}
.option-item_false{
  border: 1px solid #ffbba4;
  background: #fff6f3;
}

.label{
  width: 30px;
  height: 30px;
  border: 1px solid #e6e6e6;
  border-radius: 15px;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;

}
.option-item-label_true{
  background: #32ca99;
  border: 1px solid #32ca99;
  color: #ffffff;
}

.option-item-label_false{
  background: #ff561b;
  border: 1px solid #ff561b;
  color: #ffffff;
}
</style>
