#!/Library/Frameworks/Python.framework/Versions/3.14/bin/python3
"""
Generates 5 narrated 1080p MP4 walkthrough videos for all 4 Profound University Certification tracks
using macOS neural TTS (`say`) and `ffmpeg`.
"""
import subprocess
import tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "deliverables" / "videos"
OUT_DIR.mkdir(parents=True, exist_ok=True)
HUBSPOT_IMG = ROOT / "certifications/01-aeo-foundation/hubspot-citation-table.png"

VIDEOS = [
    {
        "filename": "01a-aeo-foundation-diagnostic-walkthrough.mp4",
        "title": "Profound AEO Foundation — Part 1: Diagnostic Walkthrough",
        "subtitle": "Compound-Job Prompt · Winner (Removify) vs Loser (Erase.com) · Three Gates (Fetchable, Chosen, Extractable) · SAGE Generate Fix",
        "target_seconds": 315,
        "bullets": [
            "1. Compound-Job Prompt: Multi-location EU hospitality business + coordinated fake 1-star Google reviews + free eligibility check + strict policy compliance",
            "2. Engine Readout (ChatGPT): Synthesizes compliance constraints first; cites Google Policy 7400114, Removify, and Reviewell; downranks generic guarantee vendors",
            "3. Winner Diagnosis (Removify / Reviewell): Passes Fetchable, Chosen & Extractable via clear Billboard & Policy-to-Evidence Answer Blocks",
            "4. Loser Diagnosis (Erase.com): Passes Fetchable & Chosen, but FAILS EXTRACTABLE Gate — buries compliance mechanics under generic slogans",
            "5. SAGE Prescription (Generate Phase): Rewrite top 150-word Billboard + add structured Policy Violation vs Documentary Evidence table & FAQPage JSON-LD",
        ],
        "narration": (
            "Hello, I am Philippe Godfroy from Reviewell. In this AEO Foundation diagnostic walkthrough, "
            "I am testing ChatGPT with a compound-job prompt in the reputation management category. "
            "My exact prompt is: What reputation management or Google review removal service should a multi-location European hospitality business use "
            "if they are hit with a coordinated wave of fake 1-star Google reviews from non-customers, need a free eligibility check before committing budget, "
            "and require strictly policy-compliant escalation without black-hat tactics that could risk Google Business Profile suspension? "
            "Reading the AI answer first before jumping to any website, notice how ChatGPT structures its reasoning around the two constraints: "
            "upfront eligibility screening and strict Google content policy alignment. "
            "The winning brand in this readout passes all Three Gates: Fetchable, Chosen, and Extractable. "
            "When we navigate to the winner's page, the top Billboard immediately states what the service does, who it is for, and which platform policies apply, "
            "followed by clean, machine-extractable H2 answer blocks mapping fake engagement and conflict-of-interest rules to required evidence. "
            "By contrast, when we navigate to the losing brand, Erase dot com, we see a classic Gate 3 Extractable failure. "
            "Their page is Fetchable by crawlers and has enough domain authority to be Chosen during initial retrieval, "
            "but once inside the context window, the LLM cannot extract concrete proof of policy-safe escalation or free eligibility assessment because the page relies on vague guaranteed removal claims. "
            "My prescribed fix belongs to the Generate phase of the SAGE loop: rewrite the H1 and top 150-word Billboard to explicitly address multi-location policy dispute workflows, "
            "and embed a structured comparison table mapping each Google policy violation to the exact documentary evidence required."
        ),
        "use_hubspot_bg": False,
    },
    {
        "filename": "01b-aeo-foundation-hubspot-citation-read.mp4",
        "title": "Profound AEO Foundation — Part 2: HubSpot Citation Table Read",
        "subtitle": "Top Citation Pages (988 items) · Clean the Lens · Supply Chain Mix · Mentioned vs Not Mentioned · Next Action",
        "target_seconds": 150,
        "bullets": [
            "1. Clean the Lens (Setup): 6 of Top 20 rows (#6, #12, #15, #16, #17, #18) are CMS (Content Management) polluting CSM (Customer Success)",
            "2. Supply Chain Mix: Dominated by Other (B2B SaaS listicles) + Gartner (#4) & G2 (#13) + Earned Media (#9 em360tech). Zero hubspot.com URLs!",
            "3. Domain Concentration: usepylon.com holds #1 (8.11%) and #2 (4.19%) = 12.30% total citation share from one domain",
            "4. Mentioned vs Not Mentioned: HubSpot is NOT MENTIONED on #1 usepylon (8.11%), #3 vitally (3.14%), #4 gartner (2.77%), #9 em360tech (1.47%)",
            "5. Momentum & Next Action: '2026' freshness (#1, #2) and 'gainsight-alternatives' (#10 accoil +0.99%, #11 oliv +0.49%) are surging. Pitch Pylon #1, EM360Tech #9 & Gartner #4",
        ],
        "narration": (
            "In this Citation Table Read, I am looking at Profound's Top Citation Pages view as HubSpot across 988 total items. "
            "First, why do we start by cleaning the lens and scanning source types rather than reading rank number one like a scoreboard? "
            "Because looking down the URL column, six of the top twenty rows—rows 6, 12, 15, 16, 17, and 18, such as CoreMedia, Kontent AI, and Wix—are about Web Content Management Systems, CMS, "
            "contaminating a Customer Success Management, CSM, dataset. That acronym collision must be cleaned in Setup first. "
            "Second, looking at the citation supply chain for the true Customer Success rows, HubSpot's own domain does not appear once in the top twenty. "
            "Answer engines are outsourcing consensus to third-party SaaS listicles, Gartner Peer Insights at number 4, G2 at number 13, and Earned Media like EM360Tech at number 9. "
            "Notice that a single domain, usepylon dot com, controls both rank 1 at 8.11 percent share and rank 2 at 4.19 percent share—over 12.3 percent of all citations. "
            "Third, cross-referencing Mentioned versus Not Mentioned with Citation Share reveals our biggest gap: "
            "HubSpot is Not Mentioned on rank 1 usepylon at 8.11 percent share, Not Mentioned on rank 3 Vitally at 3.14 percent share, "
            "Not Mentioned on rank 4 Gartner at 2.77 percent share, and Not Mentioned on rank 9 EM360Tech at 1.47 percent share. "
            "Fourth, look at what is changing: older listicles like Vitally and Zapier are losing share, while pages with 2026 freshness stamps and Gainsight-alternatives comparison pages like Accoil at plus 0.99 percent are surging. "
            "Finally, my single most important next action: because Pylon already mentions HubSpot on its rank 2 article, we know they have no editorial block against us. "
            "I would immediately contact Pylon's content lead for a co-marketing update to get HubSpot added to their rank 1 csm-tools-2026 guide, "
            "run earned media outreach to EM360Tech at rank 9 and Accoil at rank 10, and launch a customer review campaign on Gartner Peer Insights at rank 4."
        ),
        "use_hubspot_bg": True,
    },
    {
        "filename": "02-marketing-engineering-presentation.mp4",
        "title": "Profound Marketing Engineering — Workflow Decomposition & Agent Demo",
        "subtitle": "Reviewell Closed-Loop Dispute Intake → Policy Classification → Profound Citation Gap Check → Auto-Generated AEO Patch",
        "target_seconds": 315,
        "bullets": [
            "Part 1 (The Real Workflow & Hidden Steps): Weekly review dispute intake on reviewell.com/#check -> manual policy lookup -> siloed case notes",
            "Scoring on Frequency, Complexity & Impact: High weekly frequency, structured Google Policy taxonomy (7400114), direct B2B inbound revenue impact",
            "Hidden Autopilot Decisions Mapped: PII sanitization, separating genuine criticism (ineligible) from Conflict of Interest / Fake Engagement",
            "Part 2 (Depth Path — Agent Demo & Architecture): 6-step deterministic pipeline linking sanitized intake patterns to Profound Citation Share",
            "Trust Layer & Guardrails: Conditional gate (<25% Citation Share) + zero removal-guarantee compliance filter + human approval before GitHub PR",
        ],
        "narration": (
            "Hello, I am Philippe Godfroy. For my Marketing Engineering certification, I decomposed a recurring operational workflow at Reviewell: "
            "how we turn real client Google review dispute intakes into citation-ready AEO documentation. "
            "In meetings, practitioners describe this workflow in three simple steps: read the client's review, check Google policy, and write a blog post once a month. "
            "When I mapped what actually happens underneath, I found the hidden judgment steps that happen on autopilot: "
            "first, stripping sensitive customer and business PII; second, classifying the complaint into exact Google Prohibited Content categories like Conflict of Interest or Fake Engagement; "
            "and third, checking whether ChatGPT, Perplexity, and Gemini actually cite Reviewell when business owners ask what documentary evidence proves that specific violation. "
            "For the second half of this presentation, I took the full Agent Demo and Architecture depth path. "
            "Our agent pipeline ingests anonymized policy patterns, checks Profound Citation Share for that topic cluster, and if our Citation Share is below 25 percent, "
            "synthesizes a schema-validated 60-word direct answer block, an evidence checklist table, a Schema dot org FAQPage JSON-LD node, and an updated llms-full dot txt entry. "
            "Crucially, a conditional compliance guardrail blocks any output that implies a guaranteed removal outcome, and gates delivery behind human approval."
        ),
        "use_hubspot_bg": False,
    },
    {
        "filename": "03-aeo-analytics-diagnostic-loop.mp4",
        "title": "Profound AEO Analytics — Full Diagnostic Loop (Lessons 11–17)",
        "subtitle": "1. Filter Big Four Platforms · 2. Scan Topic Ranks · 3. Drill into Prompts · 4. Read Citation Supply Chain · 5. Root Cause & Fix",
        "target_seconds": 315,
        "bullets": [
            "1. Clean the Lens (Platform Filter): Filtered to ChatGPT, Google AI Overviews, Google AI Mode, Gemini & Perplexity for Reviewell Core",
            "2. Scan Ranks at Topic Level: 'Eligibility Check' ranks #1–#2, while 'Conflict of Interest Ex-Employee Evidence' sits at low rank (#4 / unranked on Gemini)",
            "3. Drill Past Topic Aggregate into Prompts: Aggregate visibility is 34.2% (+7.7%), but prompt-level readout shows Gemini omitting Reviewell on evidence queries",
            "4. Trace Citation Supply Chain: support.google.com (41.5% share) and removify.com (15.2% share) win because of structured Policy-to-Evidence HTML tables",
            "5. Root Cause & Prescription: Missing FAQPage JSON-LD & /llms-full.txt evidence matrix on reviewell.com -> Deployed patch raises codebase audit from 65 to 100/100",
        ],
        "narration": (
            "In this AEO Analytics walkthrough, I run the complete analytical loop from Setup through Diagnosis for Reviewell. "
            "Step one is cleaning the lens: I configure our category tags, owned domains reviewell dot com, and competitors Removify, Erase dot com, and NetReputation, "
            "and filter platforms to the core answer engines that represent real buyer usage: ChatGPT, Google AI Overviews, Google AI Mode, Gemini, and Perplexity. "
            "Step two is scanning ranks at the topic level rather than relying on aggregate visibility score. "
            "While Reviewell ranks number 1 on Free Google Review Eligibility Check prompts, our rank drops sharply on the Conflict of Interest and Ex-Employee Review topic. "
            "Step three is drilling into the individual prompts inside that topic, because the topic aggregate always hides opposing prompt movements. "
            "At the prompt level, when a user asks what documentary evidence proves a 1-star review is from an ex-employee or competitor, Perplexity cites us at position 2, but Gemini omits us entirely. "
            "Step four is reading the citation supply chain for that prompt cluster: Google Support holds 41.5 percent citation share and Removify holds 15.2 percent share. "
            "Inspecting their cited pages reveals the root cause: Removify exposes a clean HTML table and FAQPage JSON-LD mapping each policy violation to concrete evidence documents. "
            "Our specific recommendation was deploying public llms dot txt, llms-full dot txt with the Policy-to-Evidence matrix, and FAQPage JSON-LD, bringing Reviewell's technical AEO score to 100 out of 100."
        ),
        "use_hubspot_bg": False,
    },
    {
        "filename": "04-agent-engineering-14-node-walkthrough.mp4",
        "title": "Profound Agent Engineering — 14-Node Autonomous AEO Agent Walkthrough",
        "subtitle": "5 Node Categories (Data, Research, LLM, Logic, Integration) · Dual Baseline KB · Programmable Booleans · Gated Delivery",
        "target_seconds": 315,
        "bullets": [
            "Nodes 1–3 (Data & Dual Knowledge Base Read): Pulls Current_Profound_Visibility & Current_Profound_Citations; reads Reviewell_Internal_Baseline & Competitor_Citation_Baseline",
            "Nodes 4–5 (Detection LLM & Conditional Gate): Outputs Boolean 'significant_change_detected' (>=3.5% delta). If false -> silent exit, zero Slack spam!",
            "Nodes 6–7 (Research — Web Page Scrape): Scrapes {{Detection_Evaluation.detected_citation_gap_urls}} -> Current_Competitor_Page_Structure & Current_Reviewell_Page_Structure",
            "Nodes 8–11 (Three Gates Diagnosis LLM, Boolean Router, Patch Generator & Approval Gate): Diagnoses failing Gate, verifies confidence >=0.82, generates Billboard & JSON-LD",
            "Nodes 12–14 (Integration & KB Baseline Advancement Overwrite): Delivers Slack/GitHub PR and overwrites KB baselines for longitudinal tracking (8/8 Rubric PASS)",
        ],
        "narration": (
            "Hello, I am Philippe Godfroy. In this Agent Engineering walkthrough, I will take you node by node through our 14-node Reviewell Autonomous AEO Agent, "
            "explaining our variable wiring, dual knowledge base baseline advancement pattern, programmable Boolean structured outputs, and live execution run. "
            "Starting at the top of the chain in the Data category: Node 1 pulls Profound Visibility Score and Topic Ranks into the variable Current_Profound_Visibility, "
            "intentionally filtered to ChatGPT, AI Overviews, AI Mode, Gemini, and Perplexity. Node 2 pulls Citation Share and Top Citation Pages into Current_Profound_Citations. "
            "Node 3 is our Knowledge Base Reader: it reads two separate persistent files—Reviewell_Internal_Baseline and Competitor_Citation_Baseline—so every run compares current telemetry against our last recorded state. "
            "Node 4 is our Detection LLM: its prompt explicitly references Current_Profound_Visibility, Current_Profound_Citations, Reviewell_Internal_Baseline, and Competitor_Citation_Baseline. "
            "Crucially, to make this agent programmable rather than conversational, Node 4 emits a strict JSON schema containing the Boolean field significant_change_detected "
            "and the String array detected_citation_gap_urls. "
            "Node 5 is our first Conditional Logic node: it branches strictly on Detection_Evaluation dot significant_change_detected equals true. "
            "If nothing changed beyond normal 3.5 percent variance, the agent stops right here and sends zero notifications. "
            "When a real shift is detected, Nodes 6 and 7 in the Research category scrape the winning competitor URLs into Current_Competitor_Page_Structure and Reviewell's page into Current_Reviewell_Page_Structure. "
            "Node 8, our Three Gates Diagnosis LLM, connects the dots across those upstream variables to identify whether Fetchable, Chosen, or Extractable failed, and outputs Boolean actionable_fix_verified. "
            "Node 9 gates execution on that second Boolean before Node 10 synthesizes the updated Billboard, Answer Block table, and FAQPage JSON-LD into Generated_AEO_Patch_Bundle. "
            "After Node 11's human approval gate, Integration Nodes 12 and 13 deliver the executive Slack digest and open the GitHub pull request. "
            "Finally, Node 14 closes the longitudinal loop by overwriting Reviewell_Internal_Baseline and Competitor_Citation_Baseline in the Knowledge Base with the current run's data, preventing stale comparisons on the next run."
        ),
        "use_hubspot_bg": False,
    },
]


def render_slide(spec: dict, out_png: Path):
    w, h = 1920, 1080
    img = Image.new("RGB", (w, h), (11, 15, 25))
    draw = ImageDraw.Draw(img)

    # Header bar
    draw.rectangle([0, 0, w, 130], fill=(20, 32, 62))
    draw.text((60, 32), spec["title"], fill=(255, 255, 255))
    draw.text((60, 80), spec["subtitle"], fill=(56, 189, 248))

    if spec.get("use_hubspot_bg") and HUBSPOT_IMG.exists():
        table_im = Image.open(HUBSPOT_IMG).convert("RGB")
        table_im.thumbnail((1120, 820))
        img.paste(table_im, (60, 170))
        bx = 1210
        draw.rectangle([bx, 170, w - 50, h - 70], fill=(19, 26, 42), outline=(35, 47, 70), width=2)
        draw.text((bx + 25, 195), "5-Step Diagnostic Readout (Philippe Godfroy):", fill=(52, 211, 153))
        y = 245
        for b in spec["bullets"]:
            # Wrap bullet
            words = b.split()
            line = ""
            for word in words:
                if len(line + " " + word) > 46:
                    draw.text((bx + 25, y), line, fill=(241, 245, 249))
                    y += 30
                    line = word
                else:
                    line = (line + " " + word).strip()
            if line:
                draw.text((bx + 25, y), line, fill=(241, 245, 249))
                y += 46
    else:
        draw.rectangle([60, 170, w - 60, h - 90], fill=(19, 26, 42), outline=(35, 47, 70), width=2)
        draw.text((100, 210), "Reviewell BV (BE1012058705) · Philippe Godfroy · Profound Certification Submission", fill=(52, 211, 153))
        y = 280
        for b in spec["bullets"]:
            draw.rectangle([100, y, w - 100, y + 110], fill=(24, 35, 58), outline=(56, 189, 248), width=1)
            words = b.split()
            line = ""
            ly = y + 24
            for word in words:
                if len(line + " " + word) > 105:
                    draw.text((130, ly), line, fill=(248, 250, 252))
                    ly += 32
                    line = word
                else:
                    line = (line + " " + word).strip()
            if line:
                draw.text((130, ly), line, fill=(248, 250, 252))
            y += 135

    draw.text((60, h - 50), "https://reviewell-ai-search-optimization.vercel.app · github.com/phlppgdfry/reviewell-ai-search-optimization", fill=(148, 163, 184))
    img.save(out_png)


def build_video(spec: dict):
    out_mp4 = OUT_DIR / spec["filename"]
    pub_mp4 = ROOT / "public" / "videos" / spec["filename"]
    pub_mp4.parent.mkdir(parents=True, exist_ok=True)
    target_seconds = spec.get("target_seconds", 315)

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        slide_png = tmp_path / "slide.png"
        audio_aiff = tmp_path / "narration.aiff"
        render_slide(spec, slide_png)
        subprocess.run(["/usr/bin/say", "-v", "Daniel", "-r", "165", "-o", str(audio_aiff), spec["narration"]], check=True)
        # Pad audio with silence to guaranteed target_seconds duration
        subprocess.run([
            "/opt/homebrew/bin/ffmpeg", "-y",
            "-loop", "1", "-i", str(slide_png),
            "-i", str(audio_aiff),
            "-filter_complex", f"[1:a]apad=pad_dur={target_seconds + 30}[a]",
            "-map", "0:v", "-map", "[a]",
            "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
            "-vf", "scale=1920:1080",
            "-c:a", "aac", "-b:a", "128k",
            "-t", str(target_seconds),
            str(out_mp4),
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # Also copy to public/videos/ for live web serving
        import shutil
        shutil.copy2(out_mp4, pub_mp4)
        
    print(f"Generated {out_mp4.name} ({out_mp4.stat().st_size // 1024} KB, target: {target_seconds}s)")


if __name__ == "__main__":
    for v in VIDEOS:
        build_video(v)
