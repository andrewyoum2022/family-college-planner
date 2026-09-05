export default function ReferencePage() {
  return (
    <>
      <div className="pageTitle"><div><div className="eyebrow">REFERENCE</div><h1>미국 대학 입시 참고</h1></div></div>
      <div className="referenceGrid">
        <section className="card"><h2>EA · Early Action</h2><p>조기 지원이지만 일반적으로 합격 후 등록 의무가 없는 방식. 여러 학교 EA가 가능한 경우가 많지만 학교별 제한을 반드시 확인.</p></section>
        <section className="card"><h2>ED · Early Decision</h2><p>합격하면 원칙적으로 해당 학교에 등록해야 하는 binding 방식. 재정보조 조건을 포함해 가족이 충분히 검토한 뒤 선택.</p></section>
        <section className="card"><h2>REA / SCEA</h2><p>Restrictive Early Action / Single-Choice Early Action. 비구속적이지만 다른 사립대 조기지원 등을 제한할 수 있어 대학별 규칙 확인 필수.</p></section>
        <section className="card"><h2>RD · Regular Decision</h2><p>일반 지원. 많은 사립대가 1월 초 전후 마감하지만 정확한 날짜는 학교별로 다름.</p></section>
        <section className="card"><h2>FAFSA</h2><p>연방 학자금 지원 신청. Class of 2027은 2027–28 FAFSA를 사용하며, 가능한 한 개시 후 일찍 작성하는 것이 좋음.</p></section>
        <section className="card"><h2>CSS Profile</h2><p>일부 사립대 등이 자체 재정보조 산정을 위해 요구. FAFSA와 별개이며 학교별 priority deadline이 다름.</p></section>
        <section className="card"><h2>UC Application</h2><p>Common App이 아니라 UC 자체 지원서를 사용. Fall 2027 지원서는 2026-08-01부터 작성 가능하고 11월 30일까지 제출.</p></section>
        <section className="card"><h2>지원 전략</h2><p>Reach / Target / Likely로 균형을 맞추고, Physics 연구환경뿐 아니라 Philosophy 전공·부전공 규정, 비용, 캠퍼스 환경까지 함께 비교.</p></section>
      </div>
    </>
  );
}
