export default  
    [
        {
            path: '/',
            component: function (resolve) {
                require(['./components/login-forgetPasswotd/loginForgetpassword.vue'], resolve)
            }, 
            children:[
                {
                    path: '/',
                    component: function (resolve) {
                        require(['./components/login-forgetPasswotd/login.vue'], resolve)
                    }, 
                },
                {
                    path: '/forgetPass',
                    component: function (resolve) {
                        require(['./components/login-forgetPasswotd/forgetPass.vue'], resolve)
                    }, 
                },
                {
                    path: '/register',
                    component: function (resolve) {
                        require(['./components/login-forgetPasswotd/registe_companyr.vue'], resolve)
                    }, 
                }
            ] 
        },
        {
            path: '/LoginFinish',
            component: function(resolve){
                require(['./components/home/Home.vue'], resolve)
            },
            children:[
                {
                    path: '',
                    component: function (resolve) {
                        require(['./components/home/sidebar.vue'], resolve)
                    },
                    children:[
                        {
                            path: 'chart',
                            component: function (resolve) {
                                require(['./components/home/sidebarPage/Chart/chart.vue'], resolve)
                            },
                        },
                        {
                            path: 'UnderSingle',
                            component: function (resolve) {
                                require(['./components/home/sidebarPage/underSingle/underSingle.vue'], resolve)
                            }
                        },
                        {
                            path: 'rescueManagement',
                            component: function (resolve) {
                                require(['./components/home/sidebarPage/rescueManagement/rescueManagement.vue'], resolve)
                            },
                            children: [
                                {
                                    name: 'orderanagement',
                                    path: 'orderanagement',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/rescueManagement/rescueManagement _subRoutes/orderanagement.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'taskTrip',
                                    path: 'taskTrip',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/rescueManagement/rescueManagement _subRoutes/taskTrip.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'taskTrip_add',
                                    path: 'taskTrip/taskTrip_add/:id/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/rescueManagement/modal/taskTrip_add.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'CurrentTask',
                                    path: 'CurrentTask',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/rescueManagement/rescueManagement _subRoutes/currentTask.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'OrderVisit',
                                    path: 'OrderVisit',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/rescueManagement/rescueManagement _subRoutes/orderVisit.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'checkOrderVisit',
                                    path: 'checkOrderVisit/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/rescueManagement/modal/checkOrderVisit.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'shareTask',
                                    path: 'shareTask',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/rescueManagement/rescueManagement _subRoutes/shareTask.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'shareDetail',
                                    path: 'shareTask/shareDetail/:shareActionId/:bidId',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/rescueManagement/modal/shareDetail.vue'], resolve)
                                    }
                                },
                            ]
                        }, 
                        {
                            path: 'financialManagement',
                            component: function (resolve) {
                                require(['./components/home/sidebarPage/financialManagement/financialManagement.vue'], resolve)
                            },
                            children: [
                                {
                                    name: 'accounting_order',
                                    path: 'accounting_order',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/accounting_order.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'accounting_order_business',
                                    path: 'accounting_order/accounting_order_business/:id/:status',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/accounting_order_business.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'photo_details',
                                    path: 'accounting_order/photo_details/:param/:jobCode/:orderCode',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/account_order/jobPictures.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'job_recording',
                                    path: 'accounting_order/job_recording/:jobId/:jobCode/:orderCode',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/account_order/jobRecording.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'job_track',
                                    path: 'accounting_order/job_track/:jobId/:jobCode/:orderCode',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/account_order/jobTrack.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'collection_statistics',
                                    path: 'collection_statistics',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/collection_statistics'], resolve)
                                    }
                                },
                                {
                                    name: 'accounting_order_check',
                                    path: 'accounting_order_check/:id/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/account_order_modal.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'account_statement',
                                    path: 'account_statement',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/account_statement.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'account_statement_invoice_register',
                                    path: 'account_statement/account_statement_invoice_register/:isCreate/:id',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/account_statement_invoice_register.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'account_statement_payment_order',
                                    path: 'account_statement/account_statement_payment_order/:id/:partnerId/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/account_statement_payment_order.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'account_statement_check',
                                    path: 'account_statement/account_statement_check',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/account_statement_check.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'account_statement_edit',
                                    path: 'account_statement/account_statement_edit/:isCreate/:id/:isCustomer/:isConfirmed',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/account_statement_edit.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'accounts_payable',
                                    path: 'accounts_payable',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/accounts_payable.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'accounts_receivable',
                                    path: 'accounts_receivable',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/accounts_receivable.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'expenditure',
                                    path: 'expenditure',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/expenditure.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'expenditure_check',
                                    path: 'expenditure/expenditure_check/:information',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/expenditure_check.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'expenditure_write_off',
                                    path: 'expenditure/expenditure_write_off/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/expenditure_write_off.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'income',
                                    path: 'income',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/income.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'income_check',
                                    path: 'income/income_check/:information/',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/income_check.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'income_write_off',
                                    path: 'income/income_write_off/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/income_write_off.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'invoice',
                                    path: 'invoice',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/invoice.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'invoice_check',
                                    path: 'invoice/invoice_check',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/invoice_check.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'invoice_book_add',
                                    path: 'invoice/invoice_book_add',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/invoice_book_add.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'invoice_receipt',
                                    path: 'invoiceinvoice_receipt',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/invoice_receipt.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'invoice_returned',
                                    path: 'invoiceinvoice_returned',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/invoice_returned.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'invoice_book_add_record',
                                    path: 'invoiceinvoice_book_add_record',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/invoice_book_add_record.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'invoice_receipt_record',
                                    path: 'invoiceinvoice_receipt_record',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/invoice_receipt_record.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'invoice_returned_record',
                                    path: 'invoiceinvoice_returned_record',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/invoice_returned_record.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'reimbursement',
                                    path: 'reimbursement',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/financialManagement_subroute/reimbursement.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'reimbursement_add',
                                    path: 'reimbursement/reimbursement_add/:id/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/financialManagement/modal/reimbursement_add.vue'], resolve)
                                    }
                                },
                            ]
                        },
                        {
                            path: 'reportManagement',
                            component: function (resolve) {
                                require(['./components/home/sidebarPage/report/reportManagement.vue'], resolve)
                            },
                            children: [
                                {
                                    name: 'cashAccount',
                                    path: 'cashAccount',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/cashAccount.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'employeeAchievement',
                                    path: 'employeeAchievement',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/employeeAchievement.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'clientAchievement',
                                    path: 'clientAchievement',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/clientAchievement.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'visitReport',
                                    path: 'visitReport',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/visitReport.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'orderShare',
                                    path: 'orderShare',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/orderShare.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'businessIncome',
                                    path: 'businessIncome',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/businessIncome.vue'], resolve)
                                    }
                                },
                                //2017.10.16添加5个报表
                                {
                                    name: 'businessDailyReport',
                                    path: 'businessDailyReport',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/businessDailyReport.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'truckBusinessDailyReport',
                                    path: 'truckBusinessDailyReport',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/truckBusinessDailyReport.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'customerDailyReport',
                                    path: 'customerDailyReport',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/customerDailyReport.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'technicianMonthlyReport',
                                    path: 'technicianMonthlyReport',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/technicianMonthlyReport.vue'], resolve)
                                    }
                                },
                                {
                                    name: 'providerDailyReport',
                                    path: 'providerDailyReport',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/report/report_subRouter/providerDailyReport.vue'], resolve)
                                    }
                                },
                                //end
                            ]
                        },
                        {
                            path: 'companyManagement',
                            component: function (resolve) {
                                require(['./components/home/sidebarPage/companyManagement/companyManagement.vue'], resolve)
                            },
                            children: [
                                {
                                    name: 'customer',
                                    path: 'customer',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/customer.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'customer_add',
                                    path: 'customer/customer_add/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/customer_add.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'supplier',
                                    path: 'supplier',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/supplier.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'supplier_add',
                                    path: 'supplier/supplier_add/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/supplier_add.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'supplier_detail',
                                    path: 'supplier/supplier_detail/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/supplier_detail.vue'], resolve)
                                    },
                                },
                                // 4s店员工注册审核
                                {
                                    name: 'customer_contact_list',
                                    path: 'customer_contact_list',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/customer_contact_list.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'customer_contact_manager',
                                    path: 'customer_contact_list/customer_contact_manager',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/customer_contact_manager.vue'], resolve)
                                    },
                                },
                                // 公众号企业用户注册审核
                                {
                                    name: 'weChat_contact_list',
                                    path: 'weChat_contact_list',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/weChat_contact_list.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'weChat_contact_manager',
                                    path: 'weChat_contact_list/wechat_contact_manager',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/wechat_contact_manager.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'employee',
                                    path: 'employee',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/employee.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'employee_add',
                                    path: 'employee/employee_add/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/employee_add.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'turnover',
                                    path: 'turnover',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/turnover.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'turnover_leave',
                                    path: 'turnover/turnover_leave',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/turnover_leave.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'wageSetting',
                                    path: 'wageSetting',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/wageSetting.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'wageSetting_standard',
                                    path: 'wageSetting/wageSetting_standard',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/wageSetting_standard.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'salary',
                                    path: 'salary',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/salary.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'salary_reward',
                                    path: 'salary/salary_reward/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/salary_reward.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'inVehicle',
                                    path: 'inVehicle',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/inVehicle.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'listVehicles',
                                    path: 'listVehicles',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/listVehicles.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'listVehicles_add',
                                    path: 'listVehicles/listVehicles_add/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/vehicles_add.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'maintenance',
                                    path: 'maintenance',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/maintenance.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'maintenance_registration',
                                    path: 'maintenance/maintenance_registration',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/maintenance_registration.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'accident',
                                    path: 'accident',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/accident.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'buyInsurance',
                                    path: 'buyInsurance',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/buyInsurance.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'buyInsurance_add',
                                    path: 'buyInsurance/buyInsurance_add/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/vehicles_add_childPage/buyInsurance.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'annualRecord',
                                    path: 'annualRecord',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/annualRecord.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'annualRecord_add',
                                    path: 'annualRecord/annualRecord_add/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/vehicles_add_childPage/annualRecord.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'accident_registration',
                                    path: 'accident_registration/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/accident_registration.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'registration',
                                    path: 'registration',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/companyManagement_subroute/registration.vue'], resolve)
                                    },
                                },
                                {
                                    name: 'registration_add',
                                    path: 'registration/registration_add/:chosen/:isCreate',
                                    component: function (resolve) {
                                        require(['./components/home/sidebarPage/companyManagement/modal/registration_add.vue'], resolve)
                                    },
                                },
                            ]
                        }
                    ],

                },
                {
                    path: 'PersonalCenter',
                    component: function (resolve) {
                        require(['./components/home/Other/PersonalCenter.vue'], resolve)
                    }
                },
                {
                    path: '404',
                    component: function (resolve) {
                        require(['./components/home/Other/no_permission.vue'], resolve)
                    }
                },
                {
                    path: 'calendar',
                    component: function (resolve) {
                        require(['./components/home/Other/calendar_components/calendar.vue'], resolve)
                    }
                },
                {
                    path: 'help',
                    component: function(resolve) {
                        require(['./components/home/Other/help.vue'], resolve)
                    }
                },
                {
                    name: 'help',
                    path: 'help/:id',
                    component: function(resolve) {
                        require(['./components/home/Other/help/carousel.vue'], resolve)
                    }
                },
                {
                    name: 'orderDetails',
                    path: 'orderDetails/:orderNumber/:jobId',
                    component: function(resolve) {
                        require(['./components/home/sidebarPage/rescueManagement/modal/orderDetails.vue'], resolve)
                    }
                },
                {
                    path: 'systemSettings',
                    component: function (resolve) {
                        require(['./components/home/Other/systemSettings/systemSettings.vue'], resolve)
                    },
                    children: [
                       {
                            name: 'accountConfiguration',
                            path: 'accountConfiguration',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/accountConfiguration.vue'], resolve)
                            },
                        }, 
                        {
                            name: 'corporateManagement',
                            path: 'corporateManagement',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/corporateManagement.vue'], resolve)
                            },
                        },
                        {
                            name: 'add_company_branch',
                            path: 'corporateManagement/add_company_branch/:id/',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/modal/add_company_branch.vue'], resolve)
                            },
                        },
                        {
                            name: 'serialNumber',
                            path: 'serialNumber',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/serialNumber.vue'], resolve)
                            },
                        },
                        {
                            name: 'rightsAllocation',
                            path: 'rightsAllocation',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/rightsAllocation.vue'], resolve)
                            },
                        },
                        {
                            name: 'schemaConfiguration',
                            path: 'schemaConfiguration',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/schemaConfiguration.vue'], resolve)
                            },
                        },
                        {
                            name: 'parameterSetting',
                            path: 'parameterSetting',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/parameterSetting.vue'], resolve)
                            },
                        },
                        {
                            name: 'homePanel',
                            path: 'homePanel',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/homePanel.vue'], resolve)
                            },
                        },
                        {
                            name: 'quotationFormula',
                            path: 'quotationFormula',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/quotationFormula.vue'], resolve)
                            },
                        },
                        {
                            name: 'addFormula',
                            path: 'quotationFormula/addFormula/:chosen/:isCreate',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/modal/addFormula.vue'], resolve)
                            },
                        },
                        {
                            name: 'companyInformation',
                            path: 'companyInformation',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/companyInformation.vue'], resolve)
                            },
                        },
                        {
                            name: 'auditLog',
                            path: 'auditLog',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/auditLog.vue'], resolve)
                            },
                        },
                        {
                            name: 'smsBill',
                            path: 'smsBill',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/smsBill.vue'], resolve)
                            },
                        },
                        {
                            name: 'phoneBill',
                            path: 'phoneBill',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/phoneBill.vue'], resolve)
                            },
                        },
                        {
                            name: 'departmentManagement',
                            path: 'departmentManagement',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/departmentManagement.vue'], resolve)
                            },
                        },
                        {
                            name: 'addDepartment',
                            path: 'departmentManagement/addDepartment/:nowOrgId/:info/:isCreate',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/modal/addDepartment.vue'], resolve)
                            },
                        },
                        {
                            name: 'rescueVehicle',
                            path: 'rescueVehicle',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/rescueVehicle.vue'], resolve)
                            },
                        },
                        {
                            name: 'addCarStyle',
                            path: 'rescueVehicle/addCarStyle/:id/:isCreate/',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/modal/addCarStyle.vue'], resolve)
                            },
                        },
                        {
                            name: 'rescuedCar',
                            path: 'rescuedCar',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/rescuedCar.vue'], resolve)
                            },
                        },
                        {
                            name: 'vehicleModels',
                            path: 'vehicleModels',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/modal/vehicleModels.vue'], resolve)
                            },
                        },
                        {
                            name: 'rescuedAddCarStyle',
                            path: 'rescuedCar/rescuedAddCarStyle/:isCreate/:id',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/modal/rescuedAddCarStyle.vue'], resolve)
                            },
                        },
                        {
                            name: 'registerAudit',
                            path: 'registerAudit',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/registerAudit.vue'], resolve)
                            },
                        },
                        {
                            name: 'tenant',
                            path: 'tenant',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/tenant.vue'], resolve)
                            },
                        },
                        {
                            name: 'photoTemplate',
                            path: 'photoTemplate',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/photoTemplate.vue'], resolve)
                            },
                        },
                        {
                            name: 'photoTemplate_add',
                            path: 'photoTemplate/photoTemplate_add/:id/:isCreate',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/modal/photoTemplate_add.vue'], resolve)
                            },
                        },
                        {
                            name: 'smsTemplate',
                            path: 'smsTemplate',
                            component: function (resolve) {
                                require(['./components/home/Other/systemSettings/systemSettings_subRoutes/smsTemplate.vue'], resolve)
                            },
                        }
                    ]
                }
            ]
        }
    ]


  
    