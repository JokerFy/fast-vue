<template>
  <el-dialog
    :title="!dataForm.roleId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="授权">
        <el-tree
          :data="menuList"
          :props="menuListTreeProps"
          node-key="menuId"
          ref="menuListTree"
          :default-checked-keys="BottomCheck"
          :default-expand-all="true"
          show-checkbox>
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="!dataForm.roleId ?createData():updateData()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { treeDataTranslate } from '@/utils'
import { fetchList } from '@/api/menu'
import { info, create, update } from '@/api/role'
export default {
  data () {
    return {
      BottomCheck: [],
      visible: false,
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      dataForm: {
        roleId: 0,
        roleName: '',
        remark: ''
      },
      dataRule: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getBottomCheck (data) {
      var temp = []
      for (var i = 0; i < data.length; i++) {
        var res = []
        if (data[i].children) {
          res = this.getBottomCheck(data[i].children)
        } else {
          res = data[i].menuId
        }
        temp.push(res)
      }
      return temp
    },
    transfer (data) {
      var temp = []
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          temp.push(data[i][j])
        }
      }
      return temp.join(',').split(',')
    },
    init (id) {
      this.dataForm.roleId = id || undefined
      fetchList().then((data) => {
        this.menuList = treeDataTranslate(data.menu, 'menuId')
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.$refs.menuListTree.setCheckedKeys([])
        })
      }).then(() => {
        if (this.dataForm.roleId) {
          var id = this.dataForm.roleId
          info(id).then((data) => {
            if (data) {
              this.BottomCheck = this.transfer(this.getBottomCheck(treeDataTranslate(data.role.menuIdList, 'menuId')))
              this.dataForm.roleName = data.role.roleName
              this.dataForm.remark = data.role.remark
            }
          })
        }
      })
    },
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dataForm.menuIdList = [].concat(this.$refs.menuListTree.getCheckedKeys(), this.$refs.menuListTree.getHalfCheckedKeys())
          create(this.dataForm).then(response => {
            this.visible = false
            this.$emit('refreshDataList')
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dataForm.menuIdList = [].concat(this.$refs.menuListTree.getCheckedKeys(), this.$refs.menuListTree.getHalfCheckedKeys())
          update(this.dataForm).then(response => {
            this.visible = false
            this.$emit('refreshDataList')
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
