import create from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export const useStore = create((set, get) => ({
  //global values - where can these be stored across session  
  userToken: window.sessionStorage.getItem('userToken') || '',
  csrf: '',
  bizModel: JSON.parse(window.sessionStorage.getItem('bizModel')) || {
    id: '',
    name: '',
    type: '',
    imageUrl: '',
    phone: '',
  },
  personModel: {
    id: '',
    fName: '',
    lName: ''
  },
  //profile: {
  resetLoginModel: {
    userName: '',
    password: '',
    roleId: '',
    bizId: '',
    adminId: ''
  },  
    loginModel: {
      userName: '',
      password: '',
      roleId: '',
      bizId: '',
      adminId: ''
    },
    loginRoleModel: JSON.parse(window.sessionStorage.getItem('roleModel')) || {
      id: '',
      name: '',
      type: '',
      level: ''
    },
    roleModel: JSON.parse(window.sessionStorage.getItem('roleModel')) || {
      id: '',
      name: '',
      type: '',
      level: ''
    },
 // },  
  resetLoginModel: {
    userName: '',
    roleId: '',
    bizId: ''
  },
  userLoginModel: {
    userName: '',
    password: '',
    roleId: '',
    bizId: '',
    adminId: ''
  },
 
  adminId: '',
  actionType: '',
  bizList: [],
  emailRecipient: '',
  entityType: '',
  error: '',
  groupId: '',
  loading: false,
  loginDialogMsg: '',
  msg: '',  
  openBizDashboard: false,
  openBizForm: false,
  openEmailLinkForm: false,
  openGroupForm: false,
  openLogin: false,
  openPersonForm: false,
  openResetForm: false,
  openRoleForm: false,
  personList: [], 
  roleList: [],
  roleSelect: [],
  showAdminList: false,
  showBizList: false,
  showGroupList: false,
  showLoginDialog: false,
  showPassword: true,
  showPersonView: false,
  showProfileForm: false,
  showRoles: false,
  showRoleList: false,
  showServiceView: false,
  showTypeNameList: false,
  styleClass: 'showMe',
  toggleError: false,
  viewComponent: 'login',
    
  isAdmin: () => get((state) => get().isAdmin ? state.roleModel.roleType in ['SUPER', 'BIZADMIN', 'GROUPADMIN'] : false),
   
  //setters
   
  setActionType: (action) => set((state) => ({...state, actionType: action})),
  setAdminId: (id) => set((state) => ({...state, adminId: id})),
  setBizList: (list) => set((state) => ({...state, bizList: list})),
  setBizModel: (biz) => set(
    (state) => ({...state, bizModel: {
        id: biz.id,
        name: biz.name,
        type: biz.type,
        imageUrl: biz.imageUrl,
        phone: biz.phone,
      }
    }),
    window.sessionStorage.setItem('bizModel', JSON.stringify(biz))
  ),
  setCsrf: (token) => set((state) => ({...state, csrf: token })),
  setEmailRecipient: (recip) => set((state) => ({...state, recipient: recip})),
  setEntityType: (entity) => set((state) => ({...state, entityType: entity})),
  setError: (msg) => set((state) => ({...state, error: msg})),
  setGroupId: (grpId) => set((state) => ({...state, groupId: grpId})),  
  setLoading: (load) => set((state) => ({...state, loading: load})), 
  setLoginDialogMsg: (msg) => set((state) => ({...state, loginDialogMsg: msg})),
  setLoginModel: (login) => set(
    (state) => ({ ...state, loginModel: {
            userName: login.userName,
            password: login.password,
            roleId: login.roleId,
            bizId: login.bizId
          }
        }),
    window.sessionStorage.setItem('loginModel', JSON.stringify(login))
  ),  
  setOpenBizDashboard: (openBizDash) => set((state) => ({...state, openBizDashboard: openBizDash})),
  setOpenBizForm: (openBiz) => set((state) => ({...state, openBizForm: openBiz, error: ''})),
  setOpenEmailLinkForm: (openEmailForm) => set((state) => ({...state, openEmailLinkForm: openEmailForm, error: ''})),
  setOpenGroupForm: (openGroup) => set((state) => ({...state, openGroupForm: openGroup, error: ''})),
  setOpenPersonForm: (openPerson) => set((state) => ({...state, openPersonForm: openPerson, error: ''})),
  setOpenResetForm: (openReset) => set((state) => ({...state, openResetForm: openReset, error: ''})),
  setOpenRoleForm: (openRole) => set((state) => ({...state, openRoleForm: openRole, error: ''})),
  setOpenLogin: (openLoginView) => set((state) => ({...state, openLogin: openLoginView})),
  setPersonModel: (person) => set((state) => ({...state, personModel: person})),
  setPersonList: (list) => set((state) => ({...state, personList: list})),
  setProfile: (userProfile) => set((state) => ({...state, profile: userProfile})),
  setResetLoginModel: (resetModel) => set(
    (state) => ({...state, resetLoginModel: {
        userName: resetModel.userName,
        bizId: resetModel.bizId,
        roleId: resetModel.roleId,
    }})
  ), 
  setRoleList: (list) => set((state) => ({...state, roleList: list})),
  setRoleSelect: (list) => set((state) => ({...state, roleSelect: list})),
  setRoleModel: (role) => set(
    (state) => ({ ...state, roleModel: {
            id: role.id,
            name: role.name,
            type: role.type,
            level: role.level

          }
      }),
      window.sessionStorage.setItem('roleModel', JSON.stringify(role))
  ),  
  setLoginRoleModel: (role) => set(
      (state) => ({ ...state, roleModel: {
              id: role.id,
              roleName: role.name,
              roleType: role.type,
              level: role.level      
            }
        }),
        window.sessionStorage.setItem('loginRoleModel', JSON.stringify(role))
      ),  
  setShowAdminList: (showAL) => set((state) => ({...state, showAdminList: showAL})),
  setShowBizList: (showBL) => set((state) => ({...state, showBizList: showBL})),
  setShowGroupList: (showGL) => set((state) => ({...state, showGroupList: showGL})),
  setShowLoginDialog: (showLD) => set((state) => ({...state, showLoginDialog: showLD})),
  setShowPassword: (showPW) => set((state) => ({...state, showPassword: showPW})),
  setShowPersonView: (showPersons) => set((state) => ({...state, showPersonView: showPersons})),
  setShowProfileForm: (showProfile) => set((state) => ({...state, showProfileForm: showProfile})),
  setShowRoleList: (showRoles) => set((state) => ({...state, showRoleList: showRoles})),
  setShowServiceView: (showServices) => set((state) => ({...state, showServiceView: showServices})), 
  setShowTypeNameList: (showTypeNames) => set((state) => ({...state, showTypeNameList: showTypeNames})),
  setUserLoginModel: (userLogin) => set(
      (state) => ({...state, userLoginModel: userLogin})
    ),
  setUserToken: (token) => set( 
      (state) => ({...state, userToken: token}),
      window.sessionStorage.setItem('userToken', token)
    ),
  setShowRoles: (show) => set((state) => ({...state, showRoles: show})),
  setViewComponent: (view) => set((state) => ({...state, viewComponent: view})),
  
  //examples from zandust site
  //get((state) => (get().isAvailable ? "Available" : "Unavailable")),
  //makeAvailable: () => set((state) => ({ ...state, isAvailable: true })),
  //makeUnavailable: () => set((state) => ({ ...state, isAvailable: false })),
}));
  
  // Inside React component
//   const { isAvailable, makeAvailable, makeUnavailable } = useStore(); // Access whole store
//   const status = useStore((state) => state.status); // Access selected property
export default useStore;

mountStoreDevtool('Store', useStore);
