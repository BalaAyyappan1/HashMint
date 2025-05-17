

export interface QnA {
  question: string;
  answer: string;
  subAnswer?: string;
}

export interface Submenu {
  label: string;
  qna?: QnA[];
}

export interface MenuItem {
  label: string;
  submenu: Submenu[];
}

export const menuItems = [
    { label: 'ORDER', submenu: ['PAYMENTS', 'POLICIES', 'SHIPPING'] },
    { label: 'DEVICE', submenu: ['ACCESSORIES', 'CONNECTIVITY', 'SPECS', 'DISPLAY', 'BATTERY', 'HARDWARE', 'REPAIRABILITY', 'STYLUS'] },
    { label: 'SOFTWARE', submenu: ['OS', 'SPECS', 'APPS', 'DEVELOPERS','KIDS','PRIVACY','READER APP'] },
    { label: 'COMPANY', submenu: ['COMPANY', 'ABOUT US'] },
    { label: 'HEALTH', submenu: ['HEALTH', 'BLUE LIGHT'] },
    { label: 'WORK WITH US', submenu: ['COMPANY', 'PARTNERSHIP'] },
  ];

  export  const menuItems2: MenuItem[] = [
    {
      label: 'Order',
      submenu: [
        {
          label: 'PAYMENTS',
          qna: [
            { question: 'Can I pay in BTC?', answer: 'Yes, we accept Bitcoin for payment. Currently, we use the Strike plugin through Shopify, which supports Lightning Network payments only. We are working on integrating direct Bitcoin transactions on the blockchain in the future as well.' },
            { question: 'Can I get a discount code', answer: 'We currently do not have any discount codes available, but you can sign up for our newsletter to be the first to hear about upcoming promotions, releases, and other news.', subAnswer:'Sign up here: Newsletter' },
            { question: 'Does Daylight take care of VAT', answer: 'Currently, we do not take care of VAT, however we are committed to improving our international shipping policies and streamlining this process as soon as we are able.' },

          ],
        },
        {
          label: 'POLICIES',
          qna: [
            { question: 'What kind of warranty does the Hashmint Leaf 1 (DC-1) include?', answer: 'The Hashmint Leaf 1 is covered by a one-year warranty and also offers a 30-day return period for added peace of mind.' },
            { question: 'What’s the return policy for the Hashmint Leaf 1?', answer: 'You can return your Hashmint Leaf 1 within 30 days of purchase for a full refund.  If you have any questions or need help with a return, feel free to contact us at jimmy@hashmint.tech ' },
          ],
        },
        {
          label: 'SHIPPING',
          qna: [
            { question: 'How long does shipping take?', answer: 'Shipping typically takes 5-7 business days.' },
            { question: 'Do you ship internationally?', answer: 'Yes, we offer international shipping.' },
          ],
        },
      ],
    },
    
    {
      label: 'Device',
      submenu: [
        {
          label: 'Connectivity',
          qna: [
            { question: 'Can the Hashmint Leaf 1 connect to Wi-Fi?', answer: 'Yes, the Hashmint Leaf 1 connects easily to Wi-Fi, giving you smooth access to browsing, streaming, and online content.' },
            { question: 'Can I cast the Hashmint Leaf 1 to other devices?', answer: ' Absolutely! The Hashmint Leaf 1 supports casting, so you can wirelessly mirror your screen to compatible devices for a bigger and more flexible viewing experience.' },
          ],
        },
        {
          label: 'Accessories',
          qna: [
            { question: 'Are there any cases available for the Hashmint Leaf 1?', answer: "We're in the process of developing several case options, including a folio case, a child-friendly silicone case, and the knit case. These accessories are currently in production, and we anticipate having them ready for customers by spring 2025." },
            { question: 'How long does a repair take?', answer: 'Repairs typically take 7-10 business days.' },
          ],
        },
      ],
    },
    {
      label: 'Software',
      submenu: [
        {
          label: 'Downloads',
          qna: [
            { question: 'Where can I download the software?', answer: 'You can download it from our website.' },
            { question: 'Is the software compatible with my device?', answer: 'The software supports both Windows and Mac devices.' },
          ],
        },
        {
          label: 'Licensing',
          qna: [
            { question: 'How do I get a license?', answer: 'You can purchase a license directly from our website.' },
            { question: 'Is there a trial version available?', answer: 'Yes, we offer a 14-day free trial.' },
          ],
        },
      ],
    },
    {
      label: 'Company',
      submenu: [
        {
          label: 'About Us',
          qna: [
            { question: 'What is the company\'s mission?', answer: 'Our mission is to provide quality products and services.' },
            { question: 'When was the company founded?', answer: 'We were founded in 2005.' },
          ],
        },
        {
          label: 'Investors',
          qna: [
            { question: 'How can I invest in the company?', answer: 'Please contact our investor relations team for more information.' },
            { question: 'Is the company publicly traded?', answer: 'No, we are a privately held company.' },
          ],
        },
      ],
    },
    {
      label: 'Health',
      submenu: [
        {
          label: 'Wellness',
          qna: [
            { question: 'What is wellness?', answer: 'Wellness refers to the overall state of well-being, including mental and physical health.' },
            { question: 'How can I improve my wellness?', answer: 'Regular exercise, healthy eating, and stress management can improve wellness.' },
          ],
        },
        {
          label: 'Fitness',
          qna: [
            { question: 'What is the best exercise for fitness?', answer: 'A combination of strength training and cardiovascular exercise is ideal.' },
            { question: 'How often should I work out?', answer: 'Aim for at least 30 minutes of exercise, 5 times a week.' },
          ],
        },
      ],
    },
    {
      label: 'Work With Us',
      submenu: [
        {
          label: 'Careers',
          qna: [
            { question: 'How can I apply for a job?', answer: 'Visit our careers page to view current openings and apply online.' },
            { question: 'What benefits does the company offer?', answer: 'We offer health insurance, paid time off, and retirement plans.' },
          ],
        },
        {
          label: 'Internships',
          qna: [
            { question: 'How can I apply for an internship?', answer: 'Visit our internships page for application details.' },
            { question: 'What is the duration of the internship?', answer: 'Internships typically last 3 to 6 months.' },
          ],
        },
      ],
    },
  ];
