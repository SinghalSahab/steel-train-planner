# Steel Train Planner — Prototype
**URL**: https://lovable.dev/projects/42cfea10-2b56-44e0-a4f8-d7fa44b1c4b1

A prototype Decision Support System (DSS) for optimizing rake formation strategies for SAIL.  
This repository contains code, notebooks and prototypes exploring AI/ML + optimization approaches to dynamically form rakes (full train-loads) from stockyards to customer locations, with an initial focus on movements from Bokaro Steel Plant to CMO stockyards and customer locations.

Problem Statement (MoS / SAIL)
- Problem Statement ID: 25208
- Title: Design and develop an AI/ML-based Decision Support System for optimizing rake formation strategies for SAIL
- Objective summary: Dynamically form cost- and resource-efficient rakes by matching material availability, orders, loading point and rake/wagon availability while respecting operational constraints (min rake size, siding capacity, route restrictions). Output daily rake formation and dispatch plans that minimize total logistics cost (loading, transport, penalties).

This repository is a prototype implementation and research playground for that problem.

Key capabilities to explore in this project
- Match materials available in stockyards with pending customer orders.
- Suggest which stockyards should supply which destinations.
- Decide how orders can be clubbed into rakes (multi-destination handling).
- Assign available rakes/wagons to routes and loading points.
- Respect constraints: minimum rake size, loading point capacity, siding availability, wagon compatibility.
- Output daily rake plans with estimated costs and KPI metrics (utilization, delay risk, cost).

Quick links
- Problem statement: Ministry of Steel / SAIL — Problem ID 25208 (details included above)
- Repo: SinghalSahab/steel-train-planner

High-level architecture (prototype)
- Data ingestion & validation
- Demand/Inventory matcher (filters feasible pairings)
- Candidate generation (possible rake compositions / groupings)
- Cost & penalty model (estimates cost for candidate rakes)
- Optimizer/decision engine:
  - Heuristic / Greedy baselines for quick plans
  - Integer Linear Programming (ILP) or Mixed Integer Programming (MIP) formulation for constrained optimization
  - ML-assisted ranking or RL for sequencing & dynamic decisions
- Simulation / feasibility checker (ensures loading point and siding constraints)
- Output generator & visualizer (CSV / JSON plans, simple dashboard or notebooks)

Modeling & algorithm ideas
- ILP / MIP: encode capacity, wagon availability, minimum rake size, destination constraints. Good for small/medium instances.
- Greedy heuristic: prioritize high-priority orders and fill rakes by cost-per-tonne until capacity.
- Clustering + assignment: cluster orders by destination/time-window, then allocate wagons.
- Reinforcement Learning: for sequential rake formation and dispatch decisions across days.
- ML models: demand prediction (forecasting), cost regression (estimate delays/costs), ranking models for candidate proposals.
- Hybrid approach: use ML to rank candidate compositions and optimize via ILP on the top-k candidates.

Evaluation metrics
- Rake utilization (tonnage moved / capacity)
- Total transport cost
- Total penalty/delay cost
- Number of rakes (efficiency)
- On-time delivery rate (orders delivered within SLAs)
- Average time-to-dispatch (from ready-to-load to departure)

Dataset & reproducibility notes
- This prototype does not include proprietary SAIL/plant data. Replace sample CSVs with real operational data (ensure anonymization if needed).
- When using real data, validate:
  - units (tonnes vs kgs)
  - timestamps / timezones
  - consistent location identifiers
- Keep sensitive data out of the repo and configure via environment variables or secure storage.

Example planning formulation (summary)
- Variables:
  - x_r_o: whether order o is assigned to rake r
  - y_r: whether rake r is formed and dispatched
  - z_r_w: wagon assignment variables
- Objective: minimize sum(transport_cost + penalty_cost + idle_freight_cost)
- Constraints: wagon capacity, minimum rake size, loading point capacity, routing feasibility, time windows

Practical considerations & constraints
- Real-world operations impose noisy and changing constraints — build the system to be robust and allow manual overrides.
- Prioritization: orders with critical SLAs should be allowed forced assignment or higher penalty weights.
- Incremental planning: provide daily plans and allow re-planning when unexpected events occur (engine failure, late wagons).

Repository layout (suggested)
- data/                 (sample data files)
- notebooks/            (EDA, scenario exploration)
- planner/              (core planner code: ingestion, optimizer, solver wrappers)
- scripts/              (run_planner.py, evaluate_plans.py)
- examples/             (sample configs & sample runs)
- docs/                 (design notes, constraints spec)
- requirements.txt
- README.md

Roadmap / Next steps
- Add baseline heuristic planner and MIP formulation.
- Provide small synthetic dataset and example runs in examples/.
- Add unit tests and scenario-based integration tests.
- Add dashboard (Streamlit / Dash) for interactive plan inspection.
- Benchmark against historical dispatches (if available).
- Add multi-modal support (rail + road) and vehicle routing integration where needed.

Notes / Disclaimer
- This repository is a prototype research/demonstration project. It is not production-ready and must be validated against real SAIL operational constraints and safety policies before any operational use.
- If you plan to use production data or integrate with operational systems, ensure approvals and data governance are in place.
