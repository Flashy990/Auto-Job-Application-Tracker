export interface Status {
    name: string;
    amount: number;
}

export interface Application {
    id:number;
    jobPosition:string;
    company:string;
    salaryRange:string;
    location:string;
    status:string;
    documents:string[];
    notes:string;
}


export const fakeApplications:Application[] = [
    {
        id:1,
        jobPosition:'Software Development Engineer',
        company:'Amazon',
        salaryRange:'$100,000 - $150,000',
        location:'Seattle, WA',
        status:'Interviewing',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:2,
        jobPosition:'Software Development Engineer',
        company:'Meta',
        salaryRange:'$120,000 - $170,000',
        location:'Menlo Park, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:3,
        jobPosition:'Software Development Engineer',
        company:'Google',
        salaryRange:'$110,000 - $180,000',
        location:'Mountain View, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:4,
        jobPosition:'Software Development Engineer',
        company:'Uber',
        salaryRange:'$110,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:5,
        jobPosition:'Software Development Engineer',
        company:'Microsoft',
        salaryRange:'$100,000 - $140,000',
        location:'Redmond, WA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:6,
        jobPosition:'Software Development Engineer',
        company:'LinkedIn',
        salaryRange:'$120,000 - $170,000',
        location:'Sunnyvale, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:7,
        jobPosition:'Software Development Engineer',
        company:'eBay',
        salaryRange:'$100,000 - $150,000',
        location:'San Jose, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:8,
        jobPosition:'Software Development Engineer',
        company:'DoorDash',
        salaryRange:'$110,000 - $180,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:9,
        jobPosition:'Software Development Engineer',
        company:'Lyft',
        salaryRange:'$120,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applying',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:10,
        jobPosition:'Software Development Engineer',
        company:'Amazon',
        salaryRange:'$100,000 - $150,000',
        location:'Seattle, WA',
        status:'Interviewing',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:11,
        jobPosition:'Software Development Engineer',
        company:'Meta',
        salaryRange:'$120,000 - $170,000',
        location:'Menlo Park, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:12,
        jobPosition:'Software Development Engineer',
        company:'Google',
        salaryRange:'$110,000 - $180,000',
        location:'Mountain View, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:13,
        jobPosition:'Software Development Engineer',
        company:'Uber',
        salaryRange:'$110,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:14,
        jobPosition:'Software Development Engineer',
        company:'Microsoft',
        salaryRange:'$100,000 - $140,000',
        location:'Redmond, WA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:15,
        jobPosition:'Software Development Engineer',
        company:'LinkedIn',
        salaryRange:'$120,000 - $170,000',
        location:'Sunnyvale, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:16,
        jobPosition:'Software Development Engineer',
        company:'eBay',
        salaryRange:'$100,000 - $150,000',
        location:'San Jose, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:17,
        jobPosition:'Software Development Engineer',
        company:'DoorDash',
        salaryRange:'$110,000 - $180,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:18,
        jobPosition:'Software Development Engineer',
        company:'Lyft',
        salaryRange:'$120,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applying',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:19,
        jobPosition:'Software Development Engineer',
        company:'Amazon',
        salaryRange:'$100,000 - $150,000',
        location:'Seattle, WA',
        status:'Interviewing',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:20,
        jobPosition:'Software Development Engineer',
        company:'Meta',
        salaryRange:'$120,000 - $170,000',
        location:'Menlo Park, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:21,
        jobPosition:'Software Development Engineer',
        company:'Google',
        salaryRange:'$110,000 - $180,000',
        location:'Mountain View, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:22,
        jobPosition:'Software Development Engineer',
        company:'Uber',
        salaryRange:'$110,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:23,
        jobPosition:'Software Development Engineer',
        company:'Microsoft',
        salaryRange:'$100,000 - $140,000',
        location:'Redmond, WA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:24,
        jobPosition:'Software Development Engineer',
        company:'LinkedIn',
        salaryRange:'$120,000 - $170,000',
        location:'Sunnyvale, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:25,
        jobPosition:'Software Development Engineer',
        company:'eBay',
        salaryRange:'$100,000 - $150,000',
        location:'San Jose, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:26,
        jobPosition:'Software Development Engineer',
        company:'DoorDash',
        salaryRange:'$110,000 - $180,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:27,
        jobPosition:'Software Development Engineer',
        company:'Lyft',
        salaryRange:'$120,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applying',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:28,
        jobPosition:'Software Development Engineer',
        company:'Amazon',
        salaryRange:'$100,000 - $150,000',
        location:'Seattle, WA',
        status:'Interviewing',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:29,
        jobPosition:'Software Development Engineer',
        company:'Meta',
        salaryRange:'$120,000 - $170,000',
        location:'Menlo Park, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:30,
        jobPosition:'Software Development Engineer',
        company:'Google',
        salaryRange:'$110,000 - $180,000',
        location:'Mountain View, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:31,
        jobPosition:'Software Development Engineer',
        company:'Uber',
        salaryRange:'$110,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:32,
        jobPosition:'Software Development Engineer',
        company:'Microsoft',
        salaryRange:'$100,000 - $140,000',
        location:'Redmond, WA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:33,
        jobPosition:'Software Development Engineer',
        company:'LinkedIn',
        salaryRange:'$120,000 - $170,000',
        location:'Sunnyvale, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:34,
        jobPosition:'Software Development Engineer',
        company:'eBay',
        salaryRange:'$100,000 - $150,000',
        location:'San Jose, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:35,
        jobPosition:'Software Development Engineer',
        company:'DoorDash',
        salaryRange:'$110,000 - $180,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:36,
        jobPosition:'Software Development Engineer',
        company:'Lyft',
        salaryRange:'$120,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applying',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:37,
        jobPosition:'Software Development Engineer',
        company:'Amazon',
        salaryRange:'$100,000 - $150,000',
        location:'Seattle, WA',
        status:'Interviewing',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:38,
        jobPosition:'Software Development Engineer',
        company:'Meta',
        salaryRange:'$120,000 - $170,000',
        location:'Menlo Park, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:39,
        jobPosition:'Software Development Engineer',
        company:'Google',
        salaryRange:'$110,000 - $180,000',
        location:'Mountain View, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:40,
        jobPosition:'Software Development Engineer',
        company:'Uber',
        salaryRange:'$110,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:41,
        jobPosition:'Software Development Engineer',
        company:'Microsoft',
        salaryRange:'$100,000 - $140,000',
        location:'Redmond, WA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:42,
        jobPosition:'Software Development Engineer',
        company:'LinkedIn',
        salaryRange:'$120,000 - $170,000',
        location:'Sunnyvale, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:43,
        jobPosition:'Software Development Engineer',
        company:'eBay',
        salaryRange:'$100,000 - $150,000',
        location:'San Jose, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:44,
        jobPosition:'Software Development Engineer',
        company:'DoorDash',
        salaryRange:'$110,000 - $180,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:45,
        jobPosition:'Software Development Engineer',
        company:'Lyft',
        salaryRange:'$120,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applying',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:46,
        jobPosition:'Software Development Engineer',
        company:'Amazon',
        salaryRange:'$100,000 - $150,000',
        location:'Seattle, WA',
        status:'Interviewing',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:47,
        jobPosition:'Software Development Engineer',
        company:'Meta',
        salaryRange:'$120,000 - $170,000',
        location:'Menlo Park, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:48,
        jobPosition:'Software Development Engineer',
        company:'Google',
        salaryRange:'$110,000 - $180,000',
        location:'Mountain View, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:49,
        jobPosition:'Software Development Engineer',
        company:'Uber',
        salaryRange:'$110,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:50,
        jobPosition:'Software Development Engineer',
        company:'Microsoft',
        salaryRange:'$100,000 - $140,000',
        location:'Redmond, WA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:51,
        jobPosition:'Software Development Engineer',
        company:'LinkedIn',
        salaryRange:'$120,000 - $170,000',
        location:'Sunnyvale, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:52,
        jobPosition:'Software Development Engineer',
        company:'eBay',
        salaryRange:'$100,000 - $150,000',
        location:'San Jose, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:53,
        jobPosition:'Software Development Engineer',
        company:'DoorDash',
        salaryRange:'$110,000 - $180,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:54,
        jobPosition:'Software Development Engineer',
        company:'Lyft',
        salaryRange:'$120,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applying',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:55,
        jobPosition:'Software Development Engineer',
        company:'Amazon',
        salaryRange:'$100,000 - $150,000',
        location:'Seattle, WA',
        status:'Interviewing',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:56,
        jobPosition:'Software Development Engineer',
        company:'Meta',
        salaryRange:'$120,000 - $170,000',
        location:'Menlo Park, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:'',
    },
    {
        id:57,
        jobPosition:'Software Development Engineer',
        company:'Google',
        salaryRange:'$110,000 - $180,000',
        location:'Mountain View, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:58,
        jobPosition:'Software Development Engineer',
        company:'Uber',
        salaryRange:'$110,000 - $170,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:59,
        jobPosition:'Software Development Engineer',
        company:'Microsoft',
        salaryRange:'$100,000 - $140,000',
        location:'Redmond, WA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:60,
        jobPosition:'Software Development Engineer',
        company:'LinkedIn',
        salaryRange:'$120,000 - $170,000',
        location:'Sunnyvale, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:61,
        jobPosition:'Software Development Engineer',
        company:'eBay',
        salaryRange:'$100,000 - $150,000',
        location:'San Jose, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
    {
        id:62,
        jobPosition:'Software Development Engineer',
        company:'DoorDash',
        salaryRange:'$110,000 - $180,000',
        location:'San Francisco, CA',
        status:'Applied',
        documents:['Resume', 'Cover Letter'],
        notes:''
    },
];

export const fakeStatuses: Status[] = [
    {
        name:'Applying',
        amount:10,
    },
    {
        name:'Applied',
        amount:7,
    },
    {
        name:'Interviewing',
        amount:5,
    },
    {
        name:'Offered',
        amount:8,
    },
    {
        name:'Rejected',
        amount:8,
    }
];

