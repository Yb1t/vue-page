<template>
  <div class="bg">
  <div id="products" class="products">
    <div class="products-table">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button type="primary" @click="dialogAddFormVisible = true">新增产品</el-button>
        </div>
        <div>
          <!-- 产品表格 -->
          <el-table :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%; margin: 20px 0">
            <el-table-column label="产品图" width="180px">
              <template slot-scope="scope">
                <img :src="scope.row.img" alt="" width="100px">
              </template>
            </el-table-column>
            <el-table-column label="产品名" width="230px">
              <template slot-scope="scope">
                <el-link :href="scope.row.url" target="_blank" :underline="false">{{scope.row.name}}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="描述" width="650px">
              <template slot-scope="scope">
                <p>{{scope.row.description}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <!--删除框-->
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-popconfirm
                  @confirm="handleDelete(scope.$index, scope.row)"
                  title="确定删除？"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="danger">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <div class="block" style="margin-top:15px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[2,3,5,10]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="list.length">
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <!--添加产品窗口-->
    <el-dialog title="添加产品" :visible.sync="dialogAddFormVisible">
      <el-form :model="formAdd">
        <el-form-item label="产品名" :label-width="formLabelWidth">
          <el-input v-model="formAdd.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" :label-width="formLabelWidth">
          <el-input v-model="formAdd.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品链接" :label-width="formLabelWidth">
          <el-input v-model="formAdd.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片链接" :label-width="formLabelWidth">
          <el-input v-model="formAdd.img" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改窗口-->
    <el-dialog title="修改产品数据" :visible.sync="dialogChangeFormVisible">
      <el-form :model="formChange">
        <el-form-item label="产品名" :label-width="formLabelWidth">
          <el-input v-model="formChange.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品描述" :label-width="formLabelWidth">
          <el-input v-model="formChange.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品链接" :label-width="formLabelWidth">
          <el-input v-model="formChange.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片链接" :label-width="formLabelWidth">
          <el-input v-model="formChange.img" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChangeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="change">确 定</el-button>
      </div>
    </el-dialog>
    <!--查找-->
    <el-form ref="form" class="search">
        <el-card shadow="hover">
          <el-divider><i class="el-icon-search"></i> 查找</el-divider>
          <el-form-item>
            <el-input v-model="query" type="search" placeholder="筛选型号"></el-input>
          </el-form-item>
          <transition-group name="staggered-fade"
                            tag="ul"
                            class="search-items"
                            v-on:before-enter="beforeEnter"
                            v-on:enter="enter"
                            v-on:leave="leave"
          >
            <li v-for="(item, index) in computedList"
                v-bind:key="item.name"
                v-bind:data-index="index"
                style="height: 60px"
            >
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="8">
                  <el-link :underline="false" v-bind:href="item.url" target="_blank">
                    {{ item.name }}
                  </el-link>
                </el-col>
                <el-col :span="11"><div class="description">{{item.description}}</div></el-col>
              </el-row>
              <el-divider></el-divider>
            </li>
          </transition-group>
        </el-card>
    </el-form>
  </div>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  name: 'Products',
  data () {
    return {
      query: '',
      list: [
        {
          name: 'Redmi Note 10 Pro',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/61454401f855cf5ed64747a6ac04bae5.jpg',
          url: 'https://www.mi.com/buy?product_id=14206',
          description: '天玑1100年度旗舰芯'},
        {
          name: 'Redmi Note 11 Pro',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6d0a3e7acc3e91e2cfd83dbbe1d1c029.jpg',
          url: 'https://www.mi.com/redminote11pro',
          description: '120W 神仙秒充，充满只需一刻钟'},
        {
          name: 'Redmi Note 11 5G',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/50da95e9e4496dcac8704da2deb94f6e.jpg',
          url: 'https://www.mi.com/redminote11',
          description: '千元5G，明星机型，体验全面升级'},
        {
          name: 'Xiaomi Civi',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c5c752522100ecd364cc53752bb660bc.jpg',
          url: 'https://www.mi.com/xiaomicivi',
          description: '3200万高清自拍'},
        {
          name: 'Xiaomi MIX 4',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ab07e0fcbec3beb8b0f409db8bee8da4.jpg',
          url: 'https://www.mi.com/mix4',
          description: 'CUP全面屏'},
        {
          name: 'Redmi 手表 2',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f84503dbf5adbdf17111c61d4a7cf893.jpg',
          url: 'https://www.mi.com/redmiwatch2',
          description: 'AMOLED高清大屏'
        },
        {
          name: 'Xiaomi 手环6 NFC版',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b28153b80cb2c67564608e56d5c2f3f3.jpg',
          url: 'https://www.mi.com/shouhuan6/nfc',
          description: '全屏实力'
        },
        {
          name: 'Xiaomi 真无线降噪耳机 3 Pro',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0cc4e8e58d7288cd8dff13b98bdc3ea8.jpg',
          url: 'https://www.mi.com/xiaomibuds3pro',
          description: '动态降噪 静听曼妙'
        }
      ],
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页的数据条数
      dialogAddFormVisible: false,
      dialogChangeFormVisible: false,
      editingIndex: 0, // 当前编辑
      formAdd: {
        name: '',
        description: '',
        url: '',
        img: ''
      },
      formChange: {
        name: '',
        description: '',
        url: '',
        img: ''
      },
      formLabelWidth: '120px'

    }
  },
  computed: {
    computedList: function () {
      var vm = this
      return this.list.filter(function (item) {
        return item.name.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
      })
    },
    total: function () { // 总条数
      return this.list.length
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 60
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: '60px' },
          { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 60
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    handleEdit (index, row) {
      let idx = this.calculateIndex(index)
      this.formChange.title = '修改产品数据'
      this.formChange.name = this.list[idx].name
      this.formChange.description = this.list[idx].description
      this.formChange.url = this.list[idx].url
      this.formChange.img = this.list[idx].img
      this.dialogChangeFormVisible = true
    },
    add () {
      this.list.push({
        name: this.formAdd.name,
        img: this.formAdd.img,
        url: this.formAdd.url,
        description: this.formAdd.description
      })
      this.dialogAddFormVisible = false
      this.formAdd.description = ''
      this.formAdd.img = ''
      this.formAdd.url = ''
      this.formAdd.name = ''
    },
    change () {
      this.list[this.editingIndex].name = this.formChange.name
      this.list[this.editingIndex].description = this.formChange.description
      this.list[this.editingIndex].url = this.formChange.url
      this.list[this.editingIndex].img = this.formChange.img
      this.dialogChangeFormVisible = false
    },
    handleDelete (index, row) {
      let idx = this.calculateIndex(index)
      this.list.splice(idx, 1)
    },
    calculateIndex (indexInTable) {
      let idx = (this.currentPage - 1) * this.pageSize + indexInTable
      this.editingIndex = idx
      return idx
    }
  }

}
</script>

<style scoped>
.bg {
  padding: 20px 0;
  background-image: linear-gradient(25deg, #380076, #832a75, #c25471, #ff8069)
}
.products {
  width: 1280px;
  margin: 30px auto;
}

.search {
  width: 700px;
  margin: 20px auto;
}

.search-items {
  padding: 0;
  margin: 0;
  max-height: 300px;
  min-height: 180px;
  overflow-y: auto;
  overflow-x: hidden;
  list-style: none;
}
.description{
  font-size: 13px;
  color: grey;
}
</style>
