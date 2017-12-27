import types from '../mutation-types'
//定义数据模型
const state = {
  TableNames: {},
  OpenFileState: {},
  SheetState: {state: '', Data: []},
  HeaderState: {Data: []},
  ModelState: {},
  SetSheetState: {Data: []},
  ListState: {State: '', Data: [], SheetHeader: [], PageSize: 24, PageCount: 0},
  TreeState: {State: '', Data: {id: '', name: '', children: [], IsActive: ''}},
  MemberState: {Data: []},
  TopListState: {},
  PageListState: [],
  ModalShow: {DataSource: {value: '', event: ''}}
}

const getters = {
  GetModalShow (state) {
    return state.ModalShow
  },
  GetOpenFileState (state) {
    return state.OpenFileState
  },
  GetSheetState (state) {
    return state.SheetState
  },
  GetHeaderState (state) {
    return state.HeaderState
  },
  GetModelState (state) {
    return state.ModelState
  },
  GetSetSheetState (state) {
    return state.SetSheetState
  },
  GetListState (state) {
    return state.ListState
  },
  GetTreeState (state) {
    if (state.TreeState.Data.children === undefined) {
      state.TreeState.Data.children = []
    } else if (state.TreeState.Data.children.length > 0) {
      AddExpend(state.TreeState.Data.children, 15)
    }
    return state.TreeState
  },
  GetMemberState (state) {
    return state.MemberState
  },
  GetTopListState (state) {
    return state.TopListState
  },
  GetPageList (state) {
    return state.PageListState
  }
}
const actions = {
  async ReadFile ({dispatch, commit}, Path) {
    try {
        //todo:提交时解除注释
      // commit(types.Read_File_Re, await types.Read_File(Path))
        state.ModalShow.ChooseTable = true //Result.State
        dispatch('GetSheet')
    } catch (err) {
      dispatch('AddMessage', {Type: 'Error', Message: 'haha1' + err})
      console.error(err)
    }
  },
  async GetSheet ({dispatch, commit}) {
    try {
      let Result = await types.Get_Sheet()
      if (Result.State) {
        commit(types.Get_Sheet_Re, Result)
      } else {
        dispatch('AddMessage', {Type: 'Error', Message: 'haha2' + Result.Msg})
      }
    } catch (err) {
      dispatch('AddMessage', {Type: 'Error', Message: 'haha3' + err})
      console.error(err)
    }
  },
  async GetHeader ({dispatch, commit}, chooseSheet) {
    try {
      let Result = await types.Get_Header(chooseSheet)
      if (Result.State) {
        commit(types.Get_Header_Re, Result)
        dispatch('GetSetSheet', chooseSheet)
      } else {
        dispatch('AddMessage', {Type: 'Error', Message: Result.Msg})
      }
    } catch (err) {
      dispatch('AddMessage', {Type: 'Error', Message: err})
      console.error(err)
    }
  },
  async GetSetSheet ({dispatch, commit}, sheet) {
    try {
      let Result = await types.Get_SetSheet(sheet)
      if (Result.State) {
        commit(types.Get_SetSheet_Re, Result)
      } else {
        dispatch('AddMessage', {Type: 'Error', Message: Result.Msg})
      }

    } catch (err) {
      dispatch('AddMessage', {Type: 'Error', Message: err})
      console.error(err)
    }
  },
  async GetModel ({dispatch, commit}, [id, fid, name]) {
    try {
      if (id === undefined) {
        dispatch('AddMessage', {Type: 'Error', Message: '未选择会员ID'})
        return
      }
      if (fid === undefined) {
        dispatch('AddMessage', {Type: 'Error', Message: '未选择会员推荐人ID'})
        return
      }
      if (name === undefined) {
        dispatch('AddMessage', {Type: 'Error', Message: '未选择标识信息'})
        return
      }
      let Result = await types.Get_Model(id, fid, name)
      if (Result.State) {
        commit(types.Get_Model_Re, Result)
        dispatch('GetList')
      } else {
        dispatch('AddMessage', {Type: 'Error', Message: Result.Msg})
      }

    } catch (err) {
      dispatch('AddMessage', {Type: 'Error', Message: err})
      console.error(err)
    }
  },
  async GetList ({dispatch, commit}) {
    try {
      let Result = await types.Get_List()
      if (Result.State) {
        commit(types.Get_List_Re, Result)
        state.ListState.SheetHeader = state.HeaderState.Data
        state.ListState.PageSize = 24
        state.ListState.PageCount = Math.ceil(state.ListState.Data.length / state.ListState.PageSize)
        dispatch('GetPageList', 1)
        state.TreeState = {State: '', Data: {id: '', name: '', children: []}}
        state.MemberState = {Data: []}
      } else {
        dispatch('AddMessage', {Type: 'Error', Message: Result.Msg})
      }
    } catch (err) {
      dispatch('AddMessage', {Type: 'Error', Message: err})
      console.error(err)
    }
  },
  async GetTree ({dispatch, commit}, id) {
    try {
      if (id) {
        let Result = await types.Get_Tree(id)
        if (Result.State) {
          commit(types.Get_Tree_Re, Result)
        } else {
          dispatch('AddMessage', {Type: 'Error', Message: Result.Msg})
        }
      } else {
        dispatch('AddMessage', {Type: 'Error', Message: '请输入ID号'})
      }
    } catch (err) {
      dispatch('AddMessage', {Type: 'Error', Message: err})
      console.error(err)
    }
  },
  async GetMember ({dispatch, commit}, id) {
    try {
      let Result = await types.Get_Member(id)
      if (Result.State) {
        commit(types.Get_Member_Re, Result)
      } else {
        dispatch('AddMessage', {Type: 'Error', Message: Result.Msg})
      }
    } catch (err) {
      dispatch('AddMessage', {Type: 'Error', Message: err})
      console.error(err)
    }
  },
  async GetTopList ({dispatch, commit}) {
    try {
      let Result = await types.Get_TopList()
      if (Result.State) {
        commit(types.Get_TopList_Re, Result)
      } else {
        dispatch('AddMessage', {Type: 'Error', Message: Result.Msg})
      }

    } catch (err) {
      dispatch('AddMessage', {Type: 'Error', Message: err})
      console.error(err)
    }
  },

  GetPageList ({dispatch, commit, state}, currentPage) {
    let Page = []
    // console.log(state.ListState)
    for (let i = (currentPage - 1) * state.ListState.PageSize + 1, MaxCount = currentPage * state.ListState.PageSize; i <= MaxCount; i++) {
      Page.push(state.ListState.Data[i])
    }
    commit(types.Get_PageList, Page)
  },
  NavBarData ({dispatch, commit}, [value, event]) {
    console.log(value + ':' + event)
    state.ModalShow.DataSource.value = value
    state.ModalShow.DataSource.event = event
  },
}

const mutations = {
  [types.Read_File_Re] (state, Re) {
    console.log(Re)
    state.OpenFileState = Re
  },
  [types.Get_Sheet_Re] (state, Re) {
    console.log(Re)
    state.SheetState = Re
  },
  [types.Get_Header_Re] (state, Re) {
    state.HeaderState = Re
  },
  [types.Get_SetSheet_Re] (state, Re) {
    state.SetSheetState = Re
  },
  [types.Get_Model_Re] (state, Re) {

    state.ModelState = Re
  },
  [types.Get_List_Re] (state, Re) {
    // state.ListState.Data = Re.Data
    // state.ListState.State = Re.State
    state.ListState = Re
    // Object.assign(state.ListState, Re)
    // state.ListState.State = Re.State
    console.log(state.ListState)
  },
  [types.Get_Tree_Re] (state, Re) {

    state.TreeState = Re
  },
  [types.Get_Member_Re] (state, Re) {

    state.MemberState = Re
  },
  [types.Get_TopList_Re] (state, Re) {

    state.TopListState = Re
  },
  [types.Get_PageList] (state, PageDate) {
    console.log(PageDate)
    state.PageListState = PageDate
  }

}

//迭代
function AddExpend (arr, lastpad) {
  lastpad += 15
  for (let i = 0, max = arr.length; i < max; i++) {
    if (arr[i].active) delete arr[i].active
    //未定义的属性
    // if (arr[i].Expend===undefined) arr[i].Expend = false
    arr[i].pad = lastpad
    if (arr[i].children.length > 0) {
      AddExpend(arr[i].children, lastpad)
    }
  }
}
export default {state, getters, actions, mutations}