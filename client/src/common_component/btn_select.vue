<template>
    <!-- 条件搜索框 -->
    <div  :class="{'after' : after}" ref='btnSelect' style="display:inline-block;">
        <label v-if="label" class="control-label" v-html="label" :style="{marginRight: labelRight}"></label>
        <div class="btn-group"  :style="{paddingRight:padding}">
            <button 
                v-if="!inputText"
                type="button" 
                :class="[ 'btn setWidth filter', { 'grayBtn' : grayStyle == 'true'}, className  ,{'isTable':isTable && !noBorder}]"
                :style="{color: textColor, maxWidth:maxWidth, width:width, minWidth:minWidth, background:bgColor}" 
                data-toggle="dropdown" 
                :name="name"
                :data-text="defaultTitle"
                :verify="after"
                :isVerify="verify" 
                :disabled='disabled'
                ref="a"
                v-text="titlex"
                :title="titlex"
                @click="inputClick($event)"
                :id="id">
            </button>
            <input 
                v-if="inputText"
                type="text"
                :style="{ color: textColor, width:width, minWidth:minWidth, background:bgColor}" 
                data-toggle="dropdown" 
                v-model="searchQuery"
                :name="name"
                :data-text="defaultTitle"
                :verify="after"
                :disabled='disabled'
                class="inputSelect"
                ref="a"
                :isVerify="verify" 
                :placeholder="titlex"
                :id="id"
                @change="up($event)" 
                @click="inputClick($event)"
                @focus="inputFocus($event)">

            <button :class="[ 'btn dropdown-toggle caretPar', { 'grayBtn' : grayStyle == 'true' } ]"
                    data-toggle="dropdown" :disabled='disabled' :style='{width: btnWidth}' >
                <span class="caret" :style="{color:caretColor}"></span>
            </button>
            <!-- 增加下拉框宽度 From 24 to 48 -->
            <ul 
                :class="['dropdown-menu', { 'li_checkbox' : isCheckbox  } ]" 
                role="menu"  
                :style="{
                            position: popUp?'relative':'auto',
                            width: isTable && !noBorder ? parseFloat(width) + 2 + 'px' : width,
                            maxHeight:maxHeight, 
                            minWidth:'initial',
                            marginLeft: isTable && !noBorder && !noBorder ? '-1px' : 0, 
                            marginTop: isTable && !noBorder ? '0': '1px', 
                            borderTopWidth: isisTable && !noBorder ? 0 :'1px' ,
                            borderRadius:isTable && !noBorder ? '0 0 3px 3px': '3px'
                        }">    

                <li v-if="dataSource && !arr && !inputText" class="special" :style="{width: width.indexOf('rem') != -1 ? rem2px(width)-20 + 'px' : parseFloat(width) + 0 + 'px',maxHeight:maxHeight}">
                    <input class="form-control searchQuery"  placeholder="搜索关键字" v-model="searchQuery">
                </li>
                <li v-if='hasAll && dataSource'>
                    <!-- 全选选框 -->
                    <div v-if='isCheckbox'  style='width:120%;padding:0 5px;color:#3fb6e3'>
                        <checkbox
                            :text="selectMode"
                            :disabled='disabled'
                            :name="'allOf_' + name"
                            :labelLeft='"6px"'
                            labelRight='10px'
                            direction='left'
                            @updata='updateAllCheckToggle'
                            top='0px'
                        />
                    </div>
                    <a v-else href="javascript:;" @click="toggleText('全部',$event)"   title="全部">全部</a>
                </li>
                <li v-if='empty && dataSource'>
                    <a href="javascript:;" @click="toggleText('',$event)" style="color:#3fb6e3">{{ empty.toString() != 'true' ? empty : '清空' }}</a>
                </li>
                <li v-if='ourOrg && dataSource'>
                    <a href="javascript:;" @click="toggleText('本公司',$event)"  title="本公司">本公司</a>
                </li>
                <li v-if='ourOrg && dataSource'>
                    <a href="javascript:;" @click="toggleText('其他公司',$event)" title="其他公司">其他公司</a>
                </li>
                <!-- 初始选单 -->
                <li v-if="typeof dataSource[0] == 'object'" v-for="(attr,index) in dataSource"  >
                    <div v-if='isCheckbox'  style='padding:0 5px;width:138%'>
                        <checkbox
                            :text="attr[filter]"
                            :disabled='disabled'
                            :name="'ckbox_' + name"
                            labelLeft='0px'
                            labelRight='0px'
                            direction='left'
                            :params="JSON.stringify(attr)"
                            :value='attr.en?attr.en:"ckbox_" + name + index'

                            @updata='updataCheck'
                            top='0px'
                        />
                    </div>
                    <a v-else href="javascript:;"  :title="attr[filter]" v-text="attr[filter]" @click="toggleText(attr,$event)"></a>
                </li>
                <!-- 输入后过滤的选单 -->
                <li v-if="typeof dataSource[0] == 'string'" v-for="(attr,index) in dataSource" >
                    <template v-if='isCheckbox' style='padding:0 5px;width:138%'>
                        <checkbox
                            :text='attr[filter]'
                            :disabled='disabled'
                            :name="'ckbox_' + name"
                            labelLeft='0px'
                            labelRight='0px'
                            direction='left'
                            @updata='updataCheck'
                            top='0px'
                        />
                    </template>
                    <a v-else href="javascript:;" v-text="attr" @click="toggleText(attr,$event)"></a>
                </li>
                <li v-if="(!dataSource || !dataSource.length) && isEmpty">
                    <a href="javascript:;" title="暂无信息">暂无信息</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

let oldDataSource = [];

import checkbox from './checkbox.vue'

export default{
    props:{
        'grayStyle': {
            type:String,
            default:  'false'
        },
        
        id:{
            type:String,
        },
        multi:{
            type:Boolean,
            default:false
        },
        after:{
            type:Boolean,
            default:  false
        },
        width:{
            type: String,
            default:'85px'
        },
        ulistwidth:{
            default:'85px'
        },
        verify:{

        },
        btnWidth:{

        },
        bgColor:{
            type:String,
            default:'#cfe4fb'
        },
        caretColor:{
            type:String,
        },
        label:{
            type: String,
        },
        listWidth:{
            type: String,
            default: function(){
                const num = Number(this.width.replace('px', ''));
                return this.minWidth ? this.minWidth : ( num > 150 ? this.width : '150px' );
            }
        },
        url:{
            type: String,
        },
        blockBorder:{
            type: Boolean,
            default: false
        },
        filter:{
            type: String,
        },
        labelRight:{
            type: String,
        },
        maxHeight:{
            default:'215px'
        },
        maxWidth:{
            default:'260px'
        },
        inputPaddingRight:{
            type: String,
            default:'auto'
        },
        name:{
        },
        title:{
            type: String,
            default: ''
        },
        padding:{
            type: String,
            default: '0'
        },
        className: {
            type: String
        },
        color:{
            type: String,
            default: '#999'
            // default: defaultColor
        },
        index: {
            type: Number,
            default: 0
        },
        indexTwo: {},
        arr:{
            type:Array
        },
        value:{
        },
        minWidth: {
            type: String
        },
        params: {
            default: function(){
                return {};
            }
        },
        method: {
            type: String,
            default: 'get'
        },
        // 返回的字段内容
        filterName: {
            type: String
        },
        uuid:{
            default:false
        },
        field:{},
        disabled:{
            default: false
        },
        updataKey:{

        },
        hasAll: {
            type: Boolean,
            default: false
        },
        no:{
            type:Boolean,
            default: false
        },
        inputText:{
            type:Boolean,
            default: false
        },
        filterArr:{

        },
        empty: {
        },
        isSend:{

        },
        clearQuery:{

        },
        defaultCode: {

        },
        maxWidth:{
            default:'inherit'
        },
        defaultName:{},
        isCheckbox: {
            type: Boolean,
            default:false
        },
        ourOrg: {
            type: Boolean,
            default: false
        },
        isEmpty: {   // 没有下拉的时候提示暂无信息
            type: Boolean,
            default: true
        },
        noBorder:{
            type:Boolean,
            default:false
        },
        popUp:{
            type:Boolean,
            default:false
        },
        partnerCompany:{},

        random:{}  // 刷新使用（因为value可能值会一样，导致刷新不了）

    },
    data () {
        return {
            textColor: this.color,
            defaultTitle:'',
            searchQuery:'',
            dataSource:{},
            oldDataSource:null,
            el:null,
            int: true,   // 初始化
            checkArr: [],
            checkTxt: "",
            isTable:false,
            selectMode:"全选/全不选"
        }
    },
    methods:{
        rem2px(width){
            return width.replace('rem', '') * $('html').css('fontSize').replace('px', '') * 0.98 + 24;
        },
        updataCheck(name){
            const self = this;
            let toStringPage = new Set(['orderStatus','shareTask'])
            // const item_a = this.filterName ?  item[this.filterName] : item;
            self.checkArr = $(`[name=${name}]:checked`).toArray().map(function(item){
                let str = item.getAttribute('params')
                let value = JSON.parse(str)
                if(value.en){
                    return value.en
                }
                return value;
            })
            self.checkTxt = $(`[name=${name}]:checked`).toArray().map(function(item){
                let str = item.getAttribute('params')
                let value = JSON.parse(str)
                if(value.cn){
                    return value.cn
                }
                return value.name;
            }).join("、")


            $(self.$refs.a)
                .text( self.checkArr.length === 0 ? self.title:self.checkTxt )
                .attr('title', (self.checkArr.length === 0 ? self.title:self.checkTxt) )
                .css('width', (self.checkTxt.length*15>105?self.checkTxt.length*15:105) + 'px');

            // console.log(self.checkArr.length === self.dataSource.length)
            // const bool = self.checkArr.some( (value, index) => {
            //     if(Object.is(value, item_a)){
            //         self.checkArr.splice(index, 1);
            //         self.checkTxtArr.splice(index, 1);

            //         return true;
            //     }
            // });
            // if(!bool){
            //     self.checkArr.push(item_a);
            //     self.checkTxtArr.push(item[self.filter]);
            // }
            let fullSelect = this.checkArr.length !== this.dataSource.length
                
            $(`#checkbox_allOf_${this.name}`).prop('checked',!fullSelect)


            if(toStringPage.has(this.name)){
                this.checkArr =  this.checkArr.join(",")
            }
            this.$emit('updata', this.name, this.checkArr);
        },
        updateAllCheckToggle(name,clear){
            //bool为真，强制删除
            var selectName = "ckbox_" + name.split('_')[1]


            var allChk = $(`[name=${selectName}]`);
            var unCheckeds = $(`[name=${selectName}]`).not('input:checked');
            console.log(allChk,"\n",unCheckeds)
            if(!clear || unCheckeds.length === 0){
                allChk.prop('checked',false)                
            } else {
                allChk.prop('checked','checked')
            }
            allChk.toArray().forEach(it=>this.updataCheck(it.name))
        },
        toggleText(data,ev){
            var event = event || ev
            var defaultColor = this.color == '#1786f7'?'#1786f7':"#000"
            this.isDefault = false;
            // this.textColor = '#333';
            this.textColor = defaultColor;     
            var str = typeof data == 'object' ?  data[this.filter].trim() : data;  
            const self = this;
            if(this.el){
                if(this.multi){

                    if(str == '全部'){
                        this.inputText ? this.searchQuery = '全部' : this.el.text( '全部' );
                        $(this.$refs.a).css({
                            width: parseInt(this.width) + 'px'
                        });
                    }else if(str == ''){
                        this.inputText ? this.searchQuery = this.title : this.el.text( this.title );
                        $(this.$refs.a).css({
                            width: parseInt(this.width) + 'px'
                        });
                    }else{
                        this.inputText ? this.searchQuery =  this.searchQuery.text() + ',' + str  :this.el.text( this.el.text() + ',' + str );
                        $(this.$refs.a).css({
                            width: parseInt($(this.$refs.a).css('width')) + 50 + 'px'
                        });
                    }
                }else{
                    if(!str){
                        // this.el.css('color', 'rgb(153, 153, 153)');
                        this.el.css('color', defaultColor);
                    }else{
                        // this.el.css('color', '#000');
                        this.el.css('color', defaultColor);
                    }

                    this.inputText ? this.searchQuery =  str : this.el.text( str ? str : this.title);
                }
            }else{

                this.$nextTick(function(){
                    this.el = $(event.target).parentsUntil('.btn-group').parent().find('.setWidth');
                    if(!str){
                        // this.el.css('color', 'rgb(153, 153, 153)');
                        this.el.css('color', defaultColor);
                    }else{
                        // this.el.css('color', '#000');
                        this.el.css('color', defaultColor);
                    }
                    this.el.text( str ? str : this.title);
                    
                    if(this.inputText)this.searchQuery = str;
                })
            }

            // this.defaultTitle = data.trim();
            this.$nextTick(function(){
                if(self.ourOrg){
                    console.info(data);
                    if(data == '本公司'){
                         self.$emit('updata',  'orgId', global.ourOrgId);
                    }else if(data == '其他公司'){
                        self.$emit('updata',  'otherOrgId', global.ourOrgId);
                    }else if(data == '全部'){
                        self.$emit('updata', '', '');
                    }
                    return ;
                }
                if(self.filterName){
                    self.$emit('updata', self.name, data[self.filterName], self.index, self.indexTwo,this.isSend);
                }else{
                    self.$emit('updata',self.name, data, self.index, self.indexTwo,this.isSend )
                }
            });
        },
        update(){
            const self = this;
            send({
                type: self.method,
                url:self.url,
                param: self.params,
                no:self.no
            },function(err,res){
                if(err)return console.log(self.url,err);
                if(res.status == 200 || res.status == 412 || res.status == 404 ){
                    if(!res.content || !res.content[0]){
                        self.oldDataSource = [];
                    }else if(res.content[0].orgParam && res.content[0].orgParam.value && res.content[0].orgParam.values){
                        self.oldDataSource = res.content[0].orgParam.value.values;
                    }else if(res.content[0].value && res.content[0].value.values){
                        self.oldDataSource = res.content[0].value.values;
                    }else if(res.content[0].orgParam && res.content[0].orgParam.value && res.content[0].orgParam.value.oil_type_list ){
                        self.oldDataSource =  res.content[0].orgParam.value.oil_type_list;
                    }else{
                        self.oldDataSource = res.content;
                    }
                    let newArr = [];

                    self.oldDataSource.forEach(function(item,index){
                        if(item.child){
                            item.child.forEach(function(it,index){
                                if(it.child){
                                    it.forEach(function(i,index){
                                        if(i.child){

                                        }else{
                                            newArr.push(i)
                                        }
                                    });
                                }else{
                                    newArr.push(it)
                                }
                            });
                        }else{
                            newArr.push(item)
                        }
                    });

                    self.oldDataSource = newArr;


                    if(self.filterArr){
                        self.oldDataSource = self.oldDataSource.filter( (obj, index) => {
                            
                            if(obj[self.filterArr] == true){
                                return obj;
                            }
                        });
                    }
                    if(self.filterArr) console.log(self.oldDataSource);

                    self.dataSource = JSON.parse(JSON.stringify(self.oldDataSource));
                    self.watchValue(self.value);

                }else{
                    console.log(self.url,res)
                }
            })
        },
        up(ev){
            this.$emit('updata',this.name, this.searchQuery, this.index, this.indexTwo);
        },
        inputClick(ev){
            var ev = ev || event;
            $(ev.target).addClass('open');
            this.$nextTick(()=>{
                if(this.blockBorder){
                    ev.target.style.border = '1px solid rgba(0,0,0,0)';
                }
            })
            
        },
        inputFocus(ev){
            var ev = ev || event;
            $(ev.target).select();
            $(ev.target).addClass('open');
            
        },
        // 查找特定的属性
        watchValue(newv){
            const self = this;
            if(self.defaultCode && !self.value){
                    const bool = self.oldDataSource.some( (item, index) => {
                        if(self.defaultCode == item[self.defaultName]){
                            self.$nextTick( () => {
                                if(self.inputText){
                                    self.searchQuery = item[self.filter]; 
                                }else{
                                    $(self.$refs.a).html( item[self.filter] ).css('color', '#000');
                                }
                                self.$emit('updata', self.name, self.filterName  ? item[self.filterName] : item, index, self.indexTwo);
                            });
                            return true;    
                        }
                    });
                    if(!bool){
                        if(this.inputText){
                            this.searchQuery = '';
                            this.$refs.a.innerHTML = newv;
                        }else{
                            this.$refs.a.innerHTML =  ( self.partnerCompany ? self.partnerCompany : this.title ? this.title : "" )
                        }
                    }
            }else {
                if(!newv){
                    if(self.titlex) return;
                    else return this.$refs.a.innerHTML =  ( self.partnerCompany ? self.partnerCompany : (this.title ? this.title : "") );
                }
                // 查找

                if(self.uuid){
                    const bool = this.oldDataSource.some(function (item,index) {
                        if(item[self.field] == newv){
                            self.$nextTick(function(){
                                if(self.inputText){
                                    self.searchQuery = item[self.filter]
                                }else{
                                    $(self.$refs.a).html( item[self.filter] ).css('color', '#000');
                                }
                                self.$emit('updata', self.name, self.filterName  ? item[self.filterName] : item, index, self.indexTwo);
                            })
                            return true;
                        };
                    });

                    // 没有找到
                    if(!bool){
                        
                        if(this.inputText){
                            this.searchQuery = '';
                            this.$refs.a.innerHTML = newv;
                        }else{
                            this.$refs.a.innerHTML =  ( self.partnerCompany ? self.partnerCompany : this.title ? this.title : "" )
                        }
                        // this.inputText ? this.searchQuery = '' : this.$refs.a.innerHTML = newv;
                    }
                }else{
                    // 没有uuid
                    var val = newv ? newv : '';
                    this.inputText ? this.searchQuery= newv :  this.$refs.a.innerHTML = val;
                }
            }
        }
    },
    components: {
        checkbox
    },
    computed:{
        titlex(){
            var title = this.title;

            if(this.arr && this.title){
                const self = this;
                this.arr.forEach(function(ar,index){
                    if(ar.en === self.title){
                        title = ar.cn;
                        return ;
                    }
                });
            };
            return title;
        }
    },
    mounted(){
        const self = this;
        this.$nextTick(function(){
            if(self.url){
                self.update();
            }else{
                self.oldDataSource = self.arr;
                self.dataSource = self.arr;
                self.watchValue(self.value);
            };
            self.isTable = $('#vueTable').length ? true:false;

        });
    },
    watch:{
        searchQuery:function(newValue,oldValue){
            if(!this.oldDataSource)return;
            const self = this;

            this.dataSource = this.oldDataSource.filter(function (item) {

                return typeof item == 'object' ?  item[self['filter']].toUpperCase().indexOf(newValue.toUpperCase().trim()) !== -1 : item.toUpperCase().indexOf(newValue.toUpperCase().trim()) !== -1;
            });
        },
        value(newv){
            // if(this.value === newv)return;
            if( (this.oldDataSource && this.int) || (this.oldDataSource && $('#underSingle').length)  || (this.oldDataSource && $('#trailer').length) || (this.oldDataSource && $('#account_statement_edit').length)  ){
                this.int = false;
                this.watchValue(newv);
            }else if(!this.oldDataSource){
                this.inputText ? this.searchQuery= newv || '' : this.$refs.a.innerHTML = newv || '';
            }
        },
        random(newv){
            if( this.oldDataSource  ){
                this.int = false;
                this.watchValue(newv);

            }else if(!this.oldDataSource){
                this.inputText ? this.searchQuery= newv || '' : this.$refs.a.innerHTML = newv || '';
            }
        },
        clearQuery(){
            this.searchQuery = '';
        },
        updataKey(newValue){
            if(this.url){
                this.update();
            }else{
                this.oldDataSource = this.arr;
                this.dataSource = this.arr;
                this.watchValue(this.value);
            }
            // this.titlex = ( this.title ? this.title : "" );
            // this.$refs.a.innerHTML = ( this.title ? this.title : "" );
        }
    }


  }
</script>
<style scoped>
    button{
        min-height: 24px;
    }
    .filter_search_item .btn-group .filter{
        border:1px solid transparent;
        background: #fff ;
        background: transparent;
    }
    .filter[disabled]{
        background-color:  #DBDFE3  !important;
        /*border:1px solid transparent !important;*/
    }
    .caretPar{
        padding-left:8px;
        padding-right:8px;
        display: flex;
        /*flex-direction: column;*/
        justify-content: center;
        background-color: transparent !important;
        border-width: 0 !important;
    }
    .btn-group .dropdown-toggle .caret{
        color: #424e67;
    }

    .special{
        width: 146px;
        border-radius: 0;
    }
    .special input{
        width: 100%;
        /*background: #fff !important;*/
        background: #e0e5e8 !important;

    }
    .special input:focus{
        box-shadow: initial;
    }
    .dropdown-menu .form-control{
        border-right: 0;
        border-width: 0;
        /*box-shadow: 0 0 11px rgba(57, 182, 229,.6);*/
    }
   .dropdown-menu.arr li{
       cursor: pointer;
       text-align:center;
       
   }
   .arr{
      padding:5px;
      width:100px !important;
   }
    .dropdown-menu > li > a{
        /*color:#424e67;*/
        color:#1786f7;
    }
    

    .setColor{
        color: #333;
    }
    .btn-group{
        
    }
    .btn-group .dropdown-toggle.grayBtn{
        background-color:#999;
    }
    .setWidth{

        /*padding-left: 15px;*/
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        line-height: 10px !important;
    }
    .btn-group .setWidth .filter .grayBtn{
        border:1px solid #999;
        background-color:#e7f2fe;
        height:24px;
    }
    .special input{
        padding-left: 6px;
        border-radius: 0;
        /*box-shadow: 0 0 11px rgba(57, 182, 229,.6);*/
        font-size: 12px;
        line-height: 13px;
        height: auto;
    }
    .after:after{
        content: '';
        background: url('../assets/img.png') 0 -20px;
        width: 7px;
        height: 7px;
        position: absolute;
        left: 0;
        top: 7px;
    }
    .inputSelect{
        float: left;
        border-width: 0;
        background-color: #e7f2fe;
        line-height: 23px;
        font-size: 12px;
        padding-left:10px;
        padding-right:15px;
        border-radius:3px !important;
    }
    .inputSelect:focus{
        border:1px solid #1786f7;
    }
    .inputSelect[disabled]{
        background-color: #DBDFE3 !important;
    }
    .btn{
        border-radius: 3px !important;
    }
    /*打开下拉框，背景变白*/
    .btn-group.open .filter{
        border: 1px solid rgba(23, 134, 247,1) !important;
        background: #fff !important;
    }
    .btn-group.open .isTable{
        border-width: 0;
    }
    .btn-group > .btn:hover, .btn-group-vertical > .btn:hover, .btn-group > .btn:focus, .btn-group-vertical > .btn:focus, .btn-group > .btn:active, .btn-group-vertical > .btn:active, .btn-group > .btn.active, .btn-group-vertical > .btn.active{
        z-index: 0;
    }
    .btn:active,.btn-group.open .dropdown-toggle{
        box-shadow: none;
    }
</style>

