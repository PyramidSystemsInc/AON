Here is a repurposed **README** tailored for the **AON Internal Staff Lead Screener System** (non-public-facing), emphasizing internal use, staff workflow, and Azure-based AI infrastructure:


# AON Internal Lead Screener AI Assistant

Developed by **Pyramid Systems Inc.**, this solution powers AON's internal staff (analysts, marketing, sales, and operations) with an **AI-driven lead classification and insight tool** built on Azure.

This internal tool enables staff to:

* Upload or receive user-submitted lead data
* Automatically classify leads as **GOOD** or **JUNK**
* View reasons for classification using a transparent logic flow
* Generate actionable insights and trend reports
* Connect future outputs to CRM or BI dashboards


## 🔧 System Features

* **Internal-Use Chatbot** powered by Azure OpenAI
* **Lead Screening Engine** using proprietary prompts
* **Secure Azure Functions backend** for logic execution
* **Modular Design** for CRM expansion and auditability
* **Optional LinkedIn Verification** for frontend forms (external users)


## 🔍 Use Case Flow

![AON Lead Screener Architecture](aon_lead_screener_architecture_diagram_lg.png)

### Internal Flow Summary:

1. **Lead data** (uploaded or collected via frontend) is received.
2. AON Staff or the chatbot invokes **classification logic** using Azure OpenAI.
3. The system returns a result: `GOOD` or `JUNK`, including a reason such as:

   > “Enterprise email + Senior Role + Aligned Capability”
4. Internal teams access **reports, lead lists, and summaries** via the interface or scripts.
5. (Optional) Results are exported to **CRM systems or team dashboards**.

---

## 🚀 Getting Started (Developer Setup)

### Azure Function API

```bash
cd azure-function
npm install
func start
```

### React Frontend

```bash
cd frontend
npm install
npm start
```

> **NOTE**: Update your `.env` with valid credentials:

AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_KEY=
AZURE_OPENAI_DEPLOYMENT=
```


## 🔐 Internal Security

* **Authentication**: Azure AD B2C (for external lead intake)
* **Data Access**: Internal staff only via secure backend/API
* **Logging**: Azure Monitor and Application Insights enabled
* **Secrets**: All credentials stored via Azure Key Vault


## 📈 Future Expansion

* CRM integration (Salesforce, Oracle)
* Lead scoring dashboard and export
* Auto-tagging & segmentation for follow-up
* Monthly reporting for marketing and strategy teams
* Spam pattern recognition and flagging logic


> **Reminder**: This tool is for internal AON staff only. All lead data processed must comply with data handling guidelines, and no external data is referenced beyond the uploaded/form-collected input.
