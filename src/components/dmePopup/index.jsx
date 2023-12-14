import "./style.scss";
import { Row, Col } from "react-bootstrap";
function DmePopUp() {
  return (
    <div className="Patients_section ">
      <Row className="row-flex">
        <Col sm={12}>
          <div className="dmeArea">
            <h4>HCPCS codes for knee orthoses</h4>

            <p>
              <span className="code">L1810:</span> Knee orthosis (KO), elastic
              with joints, prefabricated, includes fitting and adjustment.
            </p>
            <p>
              <span className="code">L1812:</span> Knee orthosis, elastic with
              condylar pads and joints, prefabricated, includes fitting and
              adjustment.
            </p>
            <p>
              <span className="code">L1820:</span> Knee orthosis, adjustable
              knee joints (unicentric or polycentric), positional orthosis,
              rigid support, prefabricated, includes fitting and adjustment.
            </p>
            <p>
              <span className="code">L1830:</span> Knee orthosis, immobilizer,
              canvas longitudinal, prefabricated, includes fitting and
              adjustment.
            </p>
            <p>
              <span className="code">L1831:</span> Knee orthosis, locking knee
              joint(s), positional orthosis, prefabricated, includes fitting and
              adjustment.
            </p>
          </div>
        </Col>

        <Col sm={6}>
          <div className="dmeArea">
            {" "}
            <h4>Prefabricated Knee Orthoses (L1810, L1812, L1820, etc.):</h4>
            <ul>
              <li>
                Covered for beneficiaries requiring support for weak or deformed
                knees.
              </li>
              <li>
                Must be reasonable and necessary, documented in the medical
                record.
              </li>
              <li>
                Measurements and a detailed description of the fitting process
                should be included.
              </li>
            </ul>
          </div>
        </Col>
        <Col sm={6}>
          <div className="dmeArea">
            {" "}
            <h4>
              Custom Fabricated Knee Orthoses (L1834, L1840, L1844, etc.):
            </h4>
            <ul>
              <li>
                Covered when unique physical characteristics of the knee cannot
                be accommodated by a prefabricated orthosis.
              </li>
              <li>
                Detailed documentation of these characteristics and the need for
                customization is required.
              </li>
              <li>
                A clear description of the custom fabrication process and the
                materials used must be provided.
              </li>
            </ul>
          </div>
        </Col>
        <Col sm={6}>
          <div className="dmeArea">
            {" "}
            <h4>Documentation Requirements:</h4>
            <ul>
              <li>A prescription from a healthcare provider is necessary.</li>
              <li>
                Clinical notes justifying the need for the type of orthosis
                prescribed.
              </li>
              <li>Proof of delivery to the beneficiary.</li>
            </ul>
          </div>
        </Col>
        <Col sm={6}>
          <div className="dmeArea">
            {" "}
            <h4>Medical Necessity:</h4>
            <p>
              The orthosis must be medically necessary for the patient's
              condition, as indicated by their diagnosis and medical history.
            </p>
          </div>
        </Col>
        <Col sm={6}>
          <div className="dmeArea">
            {" "}
            <h4>Physician's Order:</h4>
            <p>
              A detailed prescription from a physician or qualified healthcare
              provider is required, stating the type of orthosis needed.
            </p>
          </div>
        </Col>
        <Col sm={6}>
          <div className="dmeArea">
            {" "}
            <h4>Patient's Condition:</h4>
            <p>
              Documentation must clearly describe the patient's current
              condition and how the orthosis will assist or treat the condition.
            </p>
          </div>
        </Col>
        <Col sm={6}>
          <div className="dmeArea">
            {" "}
            <h4>Fit and Function:</h4>
            <p>
              For prefabricated orthoses, the fit must be appropriate, and any
              adjustments made to the orthosis should be documented. For
              custom-fabricated orthoses, a description of the patient's unique
              needs that warrant a custom solution is necessary.
            </p>
          </div>
        </Col>
        <Col sm={6}>
          <div className="dmeArea">
            {" "}
            <h4>Previous Treatments:</h4>
            <p>
              Any previous treatments or orthoses used and their outcomes should
              be included to justify the new or continued need for the orthosis.
            </p>
          </div>
        </Col>
        <Col sm={6}>
          <div className="dmeArea">
            {" "}
            <h4>Expected Outcome:</h4>
            <p>
              The expected benefit from the use of the orthosis, such as
              improved mobility or pain relief, should be documented.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DmePopUp;
