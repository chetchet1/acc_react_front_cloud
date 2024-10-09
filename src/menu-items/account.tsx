// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconApps, IconUserCheck, IconBasket, IconMessages, IconLayoutKanban, IconMail, IconCalendar, IconNfc } from '@tabler/icons';
import { NavItemType } from 'types';

// constant
const icons = {
  IconApps,
  IconUserCheck,
  IconBasket,
  IconMessages,
  IconLayoutKanban,
  IconMail,
  IconCalendar,
  IconNfc
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const account: NavItemType = {
  id: 'accounting',
  title: <FormattedMessage id="accounting" />,
  icon: icons.IconApps,
  type: 'group',
  children: [
    {
      id: 'slipBaseFormPage',
      title: <FormattedMessage id="slipBaseFormPage" />,
      type: 'collapse',
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'slipFormPage',
          title: <FormattedMessage id="slipFormPage" />,
          type: 'item',
          url: '/account/posting/slip/Slip'
        },
        {
          id: 'approvalManagerFormPage',
          title: <FormattedMessage id="approvalManagerFormPage" />,
          type: 'item',
          url: '/account/posting/approvalmanager/ApprovalManager'
        },
        {
          id: 'journalFormPage',
          title: <FormattedMessage id="journalFormPage" />,
          type: 'item',
          url: '/account/posting/jounalform/JounalForm'
        },
        {
          id: 'detailTrialBalancePage',
          title: <FormattedMessage id="detailTrialBalancePage" />,
          type: 'item',
          url: '/account/settlement/detailtrialbalance/DetailTrialBalance'
        },
        {
          id: 'cashJournalPage',
          title: <FormattedMessage id="cashJournalPage" />,
          type: 'item',
          url: '/account/settlement/cashjournal/CashJournal'
        }
      ]
    },
    {
      id: 'basicInformationManagement',
      title: <FormattedMessage id="basicInformationManagement" />,
      type: 'collapse',
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'accountCodeManagerPage',
          title: <FormattedMessage id="accountCodeManagerPage" />,
          type: 'item',
          url: '/account/base/accountform/AccountDialog'
        },
        {
          id: 'customerManagerPage',
          title: <FormattedMessage id="customerManagerPage" />,
          type: 'item',
          url: '/account/base/workplacemanagement/WorkplaceManagement'
        }
      ]
    },
    {
      id: 'accountingStatementsManagement',
      title: <FormattedMessage id="accountingStatementsManagement" />,
      type: 'collapse',
      icon: icons.IconNfc,
      children: [
        {
          id: 'totalTrialBalancePage',
          title: <FormattedMessage id="totalTrialBalancePage" />,
          type: 'item',
          url: '/account/settlement/totaltrialbalance/TotalTrialBalance2'
        },
        {
          id: 'financialPositionPage',
          title: <FormattedMessage id="financialPositionPage" />,
          type: 'item',
          url: '/account/settlement/financialstatements/FinancialStatements'
        },
        {
          id: 'incomeStatementPage',
          title: <FormattedMessage id="incomeStatementPage" />,
          type: 'item',
          url: '/account/settlement/incomestatement/IncomeStatement'
        },
        {
          id: 'monthIncomeStatementPage',
          title: <FormattedMessage id="monthIncomeStatementPage" />,
          type: 'item',
          url: '/account/settlement/monthincomestatement/MonthIncomeStatement'
        },
        {
          id: 'capitalStatementPage',
          title: <FormattedMessage id="capitalStatementPage" />,
          type: 'item',
          url: '/account/settlement/capitalstatement/CapitalStatement'
        },
        {
          id: 'accountingInputPage',
          title: <FormattedMessage id="accountingInputPage" />,
          type: 'item',
          url: '/account/settlement/accounting/Accounting'
        },
      ]
    },
    {
      id: 'budgetManagement',
      title: <FormattedMessage id="budgetManagement" />,
      type: 'collapse',
      url: '/utils/util-animation',
      icon: icons.IconBasket,
      children: [
        {
          id: 'logiBudgetPage',
          title: <FormattedMessage id="logiBudgetPage" />,
          type: 'item',
          url: '/account/budget/mrp/Mrpdialog'
        },
        {
          id: 'budgetRequestPage',
          title: <FormattedMessage id="budgetRequestPage" />,
          type: 'item',
          url: '/account/budget/budgetrequest/BudgetRequest'
        },
        {
          id: 'budgetFormulationPage',
          title: <FormattedMessage id="budgetFormulationPage" />,
          type: 'item',
          url: '/account/budget/budgetformulation/BudgetFormulation'
        },
        // {
        //   id: 'budgetStatusPage',
        //   title: <FormattedMessage id="budgetStatusPage" />,
        //   type: 'item',
        //   url: '/account/budget/budgetstatus/BudgetStatus'
        // }
      ]
    },
    {
      id: 'fixedAssetManagement',
      title: <FormattedMessage id="fixedAssetManagement" />,
      type: 'collapse',
      url: '/utils/util-grid',
      icon: icons.IconBasket,
      children: [
        {
          id: 'fixedAssetRegistrationPage',
          title: <FormattedMessage id="fixedAssetRegistrationPage" />,
          type: 'item',
          url: '/account/operate/fixedAsset/FixedAsset'
        },
        {
          id: 'depreciationSchedulePage',
          title: <FormattedMessage id="depreciationSchedulePage" />,
          type: 'item',
          url: '/account/operate/depreciation/Depreciation'
        },
        {
          id: 'fixedAssetLedgerPage',
          title: <FormattedMessage id="fixedAssetLedgerPage" />,
          type: 'item',
          url: '/account/operate/fixedAssetLedger/FixedAssetLedger'
        }
      ]
    },
    {
      id: 'fundManagement',
      title: <FormattedMessage id="fundManagement" />,
      type: 'collapse',
      url: '/utils/util-grid',
      icon: icons.IconBasket,
      children: [
        {
          id: 'dailyFundPlanInputFormPage',
          title: <FormattedMessage id="dailyFundPlanInputFormPage" />,
          type: 'item',
          url: '/account/operate/funds/dailyFundPlanInput/FundPlanInputTab'
        },
        {
          id: 'noteReceivableSpecificationFormPage',
          title: <FormattedMessage id="noteReceivableSpecificationFormPage" />,
          type: 'item',
          url: '/account/operate/funds/noteSpecification/NoteReceivableSpecification'
        },
        {
          id: 'notePayableSpecificationFormPage',
          title: <FormattedMessage id="notePayableSpecificationFormPage" />,
          type: 'item',
          url: '/account/operate/funds/noteSpecification/NotePayableSpecification'
        },
        {
          id: 'dailyFundJournalFormPage',
          title: <FormattedMessage id="dailyFundJournalFormPage" />,
          type: 'item',
          url: '/account/operate/funds/dailyFundJournalStatus/FundJournalTab'
        }
      ]
    }
  ]
};

export default account;
