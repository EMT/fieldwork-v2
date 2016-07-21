import React from 'react';
import {render} from 'react-dom';

import Section from './components/Section.jsx';
import SectionCols from './components/SectionCols.jsx';
import SectionText from './components/SectionText.jsx';
import SectionTitle from './components/SectionTitle.jsx';
import Col from './components/Col.jsx';
import User from './components/User.jsx'

const data = {
	introTitle: 'We love making things, collaborating, identifying interesting problems and figuring out what we can build to help solve them',
	introText: '<p>We build things with you, collaboratively, to support and enhance the work that you do. Combining your knowledge of your organisation and its work, with our experience and design process, to produce things that have real impact.</p><p>The best way to explore possibilities and generate new ideas, is to get started. Less talking, more doing. If you were to visit our studio right now, you’d probably find us tinkering with something, making things with pixels, wires or paper. This is what we love doing, and we pour that energy and excitement into every project we undertake.</p><p>Read <a href="http://volumes.madebyfieldwork.com/making/">A Guide to Making Things</a> for our general guiding principals.</p>',
	teamTitle: 'We’re a focused team of makers and do-ers who love what we do and constantly push to improve',
	team: [
		{
			name: 'Andy Gott',
			role: 'Co-founder',
			twitter: 'https://twitter.com/_andygott',
			instagram: 'http://instagram.com/andygott',
			github: 'https://github.com/andygott',
			website: 'http://andygott.com',
			pinterest: 'http://www.pinterest.com/andygott/'
		},
		{
			name: 'Harry Parton',
			role: 'Web Developer',
			twitter: 'https://twitter.com/h_parton'
		}
	]
}

const Page = React.createClass({
  render: function () {
    return (
    <div className="page">
	    <Section>
	    	<SectionTitle title={data.introTitle} />
	    	<SectionText>
	    		{/* Replace this, assuming the data we would get is markdown. */}
	    		<div dangerouslySetInnerHTML={{__html: data.introText}} />
	    	</SectionText>
	    </Section>
	    <Section>
	    	<SectionTitle title="We work with strategy, design and technology to produce coherent and effective results on a broad range of projects" />
	    	<SectionCols>
	    		<Col cols="2" rows="1">
	    			{/* ColTitle */}
					<h2>Websites</h2>
	    			{/* ColText */}
					<p>Bringing together multiple disciplines to design and build websites that meet the needs of your organisation, it’s activities and it’s content.</p>
					{/* List style="bulleted" */}
					<ul className="bulleted-list">
						<li>Content strategy</li>
						<li>Website design</li>
						<li>Responsive web development</li>
						<li>Ecommerce</li>
					</ul>
	    		</Col>
	    	</SectionCols>
	    </Section>
	    <Section customClass="team">
	    	<SectionTitle title={data.teamTitle} />
	    	<SectionCols>
	    		{ data.team.map(function(user, i) {
					return (
						<Col key={ i } cols="3" rows="1">
							<User
						 		name={user.name}
								role={user.role}
						 		twitter={user.twitter}
						 		instagram={user.instagram}
						 		github={user.github}
						 		website={user.website}
						 		pinterest={user.pinterest}
						 	/>
					 	</Col>
				 	)
	    		 }) }
	    	</SectionCols>
	    </Section>
    </div>
	);
  }
});
render(<Page />, document.getElementById('react'));