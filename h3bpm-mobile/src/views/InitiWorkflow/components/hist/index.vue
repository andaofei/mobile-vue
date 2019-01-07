<template>
  <div class="box">
    <div class="tag-wrapper" >
      <BtScroll class="tag-scroll"
                v-loading="showLoading"
                ref="userList"
                @scroll="scroll"
                @refresh="refresh"
                :probe-type="probeType"
                :listenScroll="listenScroll"
                :pullingUp="pullingUp"
                :beforeScroll="beforeScroll"
                @beforeScroll="listScroll">
        <ul class="inner-box" v-if="workFlowLst && workFlowLst.length > 0">
          <li :key="index" v-for="(item, index) in workFlowLst">
            <div class="item-box" v-if="item.Workflows">
              <div class="item-right" :key="index" v-for="(inner, index) in item.Workflows" v-if="inner.IsFavorite" @click="handleClickSelect(inner, index)">
                <span class="svg-box">
                  <svg-icon icon-class="star-f" v-if="inner.IsFavorite"/>
                   <svg-icon icon-class="star" v-else/>
                </span>
                <p class="inner-right">
                  <span class="inner-text">{{inner.DisplayName}}</span>
                  <span class="svg-box">
                      <svg-icon icon-class="right"/>
                    </span>
                </p>
              </div>
            </div>
            <div class="item-box" v-else>
              <div class="item-right" @click="handleClickSelect(inner, index)" v-if="item.IsFavorite">
                <span class="svg-box">
                  <svg-icon icon-class="star-f"/>
                </span>
                <p class="inner-right">
                  <span class="inner-text">{{item.DisplayName}}</span>
                  <span class="svg-box">
                      <svg-icon icon-class="right"/>
                    </span>
                </p>
              </div>
            </div>
          </li>
        </ul>
        <div class="inner-box-nodata" v-else>
          <NoData></NoData>
        </div>
      </BtScroll>
    </div>
  </div>
</template>

<script>
import InitWorkflowMixin from '../../mixin'
export default {
  name: 'Hist',
  mixins: [InitWorkflowMixin],
  created() {
    this.getDataList()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../scss/index";
</style>
