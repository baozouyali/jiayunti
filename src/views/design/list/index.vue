<!--
 * @Author: 张飞达
 * @Date: 2020-10-12 09:38:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-13 16:30:15
 * @Description:设计列表
-->

<template>
  <div class="app-container">
    <el-table v-loading="listLoading" class="design-table" :data="list" element-loading-text="Loading" border fit highlight-current-row :default-sort="{prop: 'status', order: 'ascending'}">
      <el-table-column align="center" label="序号" min-width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="{ row }">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="申请人">
              <span>{{ row.apply.name }}</span>
            </el-form-item>
            <el-form-item label="申请时间">
              <span>{{ row.apply.time }}</span>
            </el-form-item>
            <el-form-item label="详细地址">
              <span>{{ row.apply.address }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ row.apply.phone }}</span>
            </el-form-item>
            <el-form-item label="加装电梯地址">
              <span>{{ row.apply.liftAddress }}</span>
            </el-form-item>
            <el-form-item label="设备规格">
              <span>{{ row.apply.spec }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="code" min-width="200" align="center" />
      <el-table-column label="申请人" min-width="200" align="center">
        <template slot-scope="{row}">
          {{ row.apply.name }}
        </template>
      </el-table-column>
      <el-table-column label="申请时间" min-width="200" sortable align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.apply.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设计时间" min-width="200" prop="designTime" sortable align="center">
        <template v-if="scope.row.designTime" slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.designTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" min-width="200" prop="auditTime" sortable align="center">
        <template v-if="scope.row.auditTime" slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.auditTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" sortable min-width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | keyToVal(designTag)">{{ scope.row.status | keyToVal(designStatus) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-row type="flex" justify="space-around">

            <el-button v-if="scope.row.status === 0" size="mini" :type="scope.row.status | keyToVal(designTag)" @click="uploadModal.visible = true">上传设计图</el-button>
            <el-button v-if="scope.row.status === 2" size="mini" :type="scope.row.status | keyToVal(designTag)" @click="editModal.visible = true">
              <router-link :to="{path:'/design/edit',query:{applyId:scope.row.Id}}">修改设计图</router-link>
            </el-button>

            <el-button v-if="scope.row.status === 3 || scope.row.status === 1" size="mini" type="success">
              <router-link :to="{path:'/design/view',query:{applyId:scope.row.Id}}">查看设计图</router-link>
            </el-button>
            <el-button size="mini" type="primary" @click="viewProcess(scope.row)">查看流程</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next, total,sizes,jumper" hide-on-single-page :total="pagination.total" :page-size="pagination.pageSize" :page-sizes="[10,20,50]" :current-page.sync="pagination.pageIndex" @size-change="handleSizeChange" @current-change="handleCurrentPageChange" />
    <el-dialog center title="上传" :visible.sync="uploadModal.visible" :close-on-click-modal="false" class="uploadModal">
      <el-upload ref="upload" action="/api/co/Attachment/UploadAttachment" :before-upload="uploadBefore" :on-success="uploadSuccess" :on-remove="uploadRemove" :on-error="uploadError" list-type="picture" drag multiple :auto-upload="false">
        <!-- <i class="el-icon-upload" /> -->
        <div>将文件拖到此处，或点击添加</div>
        <p>单个文件大小不超过20MB，可上传图片或PDF</p>
      </el-upload>
      <span slot="footer">
        <el-button size="small" type="primary" @click="submitUpload">上传设计图</el-button>
      </span>

    </el-dialog>
    <!-- <div>
      <p>联系方式</p>
      <p>审核单位：XXX图审机构 审核人员：XXX 联系电话：0512XXXX 工作时间：周一至周五 9:00-11:00 14:00-17:00</p>
    </div> -->
  </div>
</template>

<script>
import { keyToVal } from '@/utils'
export default {
  filters: {
    keyToVal
  },
  data() {
    return {
      list: [
        {
          code: 'apply10121056',
          designTime: '',
          auditTime: '',
          apply: {
            name: '李先生',
            address: '苏州高新区',
            phone: '15988800323',
            liftAddress: '小区1楼',
            spec: '高端电梯',
            time: '2020-10-12 10:56'
          },
          status: 0 // 未设计
        },
        {
          code: 'apply10131146',
          designTime: '2020-10-14 10:56',
          auditTime: '',
          apply: {
            name: '李先生',
            address: '苏州高新区',
            phone: '15988800323',
            liftAddress: '小区1楼',
            spec: '高端电梯',
            time: '2020-10-13 11:46'

          },
          status: 1 // 审核中
        },
        {
          code: 'apply10140800',
          designTime: '2020-10-14 10:56',
          auditTime: '2020-10-14 10:56',
          apply: {
            name: '李先生',
            address: '苏州高新区',
            phone: '15988800323',
            liftAddress: '小区1楼',
            spec: '高端电梯',
            time: '2020-10-14 08:00'

          },
          status: 2 // 审核未通过
        },
        {
          code: 'apply10140900',
          designTime: '2020-10-14 10:56',
          auditTime: '2020-10-14 10:56',
          apply: {
            name: '李先生',
            address: '苏州高新区',
            phone: '15988800323',
            liftAddress: '小区1楼',
            spec: '高端电梯',
            time: '2020-10-14 09:00'

          },
          status: 3 // 审核通过
        }
      ],
      listLoading: false,
      designStatus: [
        { key: 0, val: '未设计' },
        { key: 1, val: '审核中' },
        { key: 2, val: '审核未通过' },
        { key: 3, val: '审核通过' }
      ],
      designTag: [
        { key: 0, val: 'info' },
        { key: 1, val: 'warning' },
        { key: 2, val: 'danger' }
      ],
      pagination: {
        total: 20,
        pageIndex: 1,
        pageSize: 10
      },
      uploadModal: {
        visible: false
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val
    },
    handleCurrentPageChange(val) {
      this.pagination.pageIndex = val
    },
    // 图片上传之前判断
    uploadBefore(file) {
      const fileType = file.type
      const isImage = fileType.indexOf('image') !== -1
      const isBig = file.size <= 1024 * 1024 * 10
      if (!file) {
        this.$refs.upload.onError()
        this.$message.error('上传为空！')
        return false
      }
      if (!isImage) {
        this.$refs.upload.onError()
        this.$message.error('只能上传图片！')
        return false
      }
      if (!isBig) {
        this.$refs.upload.onError()
        this.$message.error('图片大小不能超过10MB！')
        return false
      }
      return true
    },
    // 图片上传成功之后回传
    uploadSuccess(res) { },
    // 图片上传失败
    uploadError() {
      this.$message.error('上传失败！')
    },
    // 图片移除
    uploadRemove(file) { },
    // 手动上传
    submitUpload() {
      this.$refs.upload.submit()
    }
  }
}
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.design-table {
  width: 100%;
  margin-bottom: 30px;
}
.design-table .demo-table-expand /deep/ label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 150px;
  margin-bottom: 0;
  width: 100%;
}
.uploadModal /deep/ .el-upload-dragger {
  padding: 40px 5px;
  border: 2px solid #e5e5e5;
  color: #777;
  -webkit-transition: background-color 0.2s linear;
  transition: background-color 0.2s linear;
}
.uploadModal /deep/ .el-upload-dragger:hover {
  background: #f6f6f6;
}
.uploadModal /deep/ .el-dialog__body {
  text-align: center;
}
</style>
