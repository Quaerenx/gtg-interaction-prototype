import { solutionSlides } from "@/content/site";

export function SolutionsHandoff() {
  return (
    <div
      className="solutions-handoff"
      data-testid="solutions-handoff"
      data-header-theme="dark"
      aria-hidden="true"
    >
      <span className="topology-signal" />
      <div className="topology-routes">
        {solutionSlides.map((solution) => (
          <span className="topology-route" data-route-id={solution.id} key={solution.id} />
        ))}
      </div>
    </div>
  );
}
